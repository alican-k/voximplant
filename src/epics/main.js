import { Observable } from 'rxjs/Observable'
import { Voximplant } from 'react-native-voximplant'
import firebase from 'react-native-firebase'
import { PermissionsAndroid } from 'react-native'
import { types, actions } from '../actions'
import { main } from '../helpers/state'
import CallManager from '../helpers/callManager'
import users from '../helpers/users'

const { concat, of, empty } = Observable
const voxClient = Voximplant.getInstance()

export const initialEpic$ = (action$, store) => action$.ofType(types.STARTUP)
	.switchMap(() => voxEvents$())

export const disconnectEpic$ = (action$, store) => action$.ofType(types.DISCONNECT)
	.do(() => voxClient.disconnect()).ignoreElements()

export const loginAsEpic$ = (action$, store) => action$.ofType(types.LOGIN_AS)
	.do(action => users.selectUser(action.payload.userIndex))
	.switchMap(() => voxClient.connect())
	.ignoreElements()
	
export const callUserRequestEpic$ = (action$, store) => action$.ofType(types.CALL_USER_REQUEST)
	.switchMap(action => voxClient.call(action.payload.userName, false, 'data->caller:' + action.payload.userName))
	.do(call => console.log('call: ', call))
	.switchMap(call => concat(
		of(actions.callUserFulFilled(call))
			.do(() => CallManager.setCall(call)),
		voxCallEvents$(call)
	))

export const callHangupRequestEpic$ = (action$, store) => action$.ofType(types.CALL_HANGUP_REQUEST)
	.do(() => {
		const call = CallManager.getCall()
		console.log('hanging up : ', call)
		if(call) call.hangup()
	})
	.ignoreElements()

export const callEventEpic$ = (action$, store) => action$.ofType(types.CALL_EVENT)
	.do(action => action.payload.event.name === 'Disconnected' ? CallManager.setCall(null) : null)
	.ignoreElements()

export const incomingCallEpic$ = (action$, store) => action$.ofType(types.VOX_EVENTS_INCOMING_CALL)
	.do(action => CallManager.setCall(action.payload.handlerArgs.IncomingCall.call))
	.switchMap(() => voxCallEvents$(CallManager.getCall()))
	// .ignoreElements()

export const callAnswerEpic$ = (action$, store) => action$.ofType(types.CALL_ANSWER)
	.do(() => CallManager.getCall().answer())
	.ignoreElements()
	// .switchMap(() => merge(
	// 	// voxCallEvents$(CallManager.getCall()),
	// 	of(null).do(() => CallManager.getCall().answer()).ignoreElements()
	// ))

export const authResultEpic$ = (action$, store) => action$.ofType(types.VOX_EVENTS_AUTH_RESULT)
	.switchMap(action => main.isLoggedIn(store.getState()) ? firebase.messaging().getToken() : empty)
	.do(token => console.log('fcm token: ', token))
	.do(token => token ? voxClient.registerPushNotificationsToken(token) : null)
	.switchMap(() => firebase.messaging().hasPermission())
	.switchMap(permission => firebase.messaging().requestPermission())
	.switchMap(() => PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]))
	.do(granted => granted['android.permission.RECORD_AUDIO'] === 'granted')
	.do(() => createAndroidCallChannel())
	.ignoreElements()

const notificationHandlers = () => Observable.create(observer => {
	firebase.notifications().onNotification(notification => {
        console.log('onNotification: ', notification)
    })
})

const createAndroidCallChannel = () => {
	const channel = new firebase.notifications.Android
		.Channel('call-channel', 'Call Channel', firebase.notifications.Android.Importance.Max)
		.setDescription('My apps call channel')
		.setLockScreenVisibility(firebase.notifications.Android.Visibility.Public)
	firebase.notifications().android.createChannel(channel)
}

const voxCallEvents$ = (call) => Observable.create(observer => {
	call.on(Voximplant.CallEvents.MessageReceived, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.Connected, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.Failed, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.ICECompleted, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.ICETimeout, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.InfoReceived, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.Disconnected, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.ProgressToneStart, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.ProgressToneStop, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.RTCStatsReceived, (event) => {
		//observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.TransferComplete, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.TransferFailed, (event) => {
		observer.next(actions.callEvent(event))
	})
	call.on(Voximplant.CallEvents.Updated, (event) => {
		observer.next(actions.callEvent(event))
	})
})	

const voxEvents$ = () => Observable.create(observer => {
	voxClient.on(Voximplant.ClientEvents.ConnectionClosed, () => {
		observer.next(actions.voxEventsConnectionClosed())
	})
	voxClient.on(Voximplant.ClientEvents.ConnectionFailed, ConnectionFailed => {
		observer.next(actions.voxEventsConnectionFailed({ ConnectionFailed }))
	})
	voxClient.on(Voximplant.ClientEvents.ConnectionEstablished, () => {
		observer.next(actions.voxEventsConnectionEstablished())
		const user = users.getMe()
		voxClient.login(user.email, user.password)
	})
	voxClient.on(Voximplant.ClientEvents.AuthResult, AuthResult => {
		observer.next(actions.voxEventsAuthResult({ AuthResult }))
	})
	voxClient.on(Voximplant.ClientEvents.IncomingCall, IncomingCall => {
		observer.next(actions.voxEventsIncomingCall({ IncomingCall }))
	})

	voxClient.getClientState().then(state => {
		console.log('state: ', state)
		if(state === 'disconnected'){
			voxClient.connect()
		} else if(state === 'logged_in') {
			observer.next(actions.voxEventsAuthResult({
				AuthResult: {
					displayName: users.getMe().userName, 
					result: true
				}
			}))
		}
	})

	return () => {}
})


