import { Observable } from 'rxjs/Observable'
import { Voximplant } from 'react-native-voximplant'
import firebase from 'react-native-firebase'
import { PermissionsAndroid } from 'react-native'
import { types, actions } from '../actions'
import { main } from '../helpers/state'

const { of, empty } = Observable
const voxClient = Voximplant.getInstance()

export const initialEpic$ = (action$, store) => action$.ofType(types.STARTUP)
	.switchMap(() => voxEvents$())

export const callUserEpic$ = (action$, store) => action$.ofType(types.CALL_USER)
	.map(action => voxClient.call(action.payload.userName, false, 'data->caller:' + action.payload.userName))
	.do(Call => console.log('Call: ', Call))
	.ignoreElements()

export const incomingCallEpic$ = (action$, store) => action$.ofType(types.VOX_EVENTS_INCOMING_CALL)
	.switchMap(action => {
		action.payload.handlerArgs.IncomingCall.call.answer()
		return empty()
	})

export const authResultEpic$ = (action$, store) => action$.ofType(types.VOX_EVENTS_AUTH_RESULT)
	.switchMap(action => main.isLoggedIn(store.getState()) ? firebase.messaging().getToken() : empty)
	.do(token => console.log('fcm token: ', token))
	.do(token => token ? voxClient.registerPushNotificationsToken(token) : null)
	.switchMap(() => firebase.messaging().hasPermission())
	.switchMap(permission => firebase.messaging().requestPermission())
	.switchMap(() => PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]))
	.do(granted => granted['android.permission.RECORD_AUDIO'] === 'granted')
	.ignoreElements()

const voxEvents$ = () => Observable.create(observer => {
	voxClient.on(Voximplant.ClientEvents.ConnectionClosed, () => {
		observer.next(actions.voxEventsConnectionClosed())
	})
	voxClient.on(Voximplant.ClientEvents.ConnectionFailed, ConnectionFailed => {
		observer.next(actions.voxEventsConnectionFailed({ ConnectionFailed }))
	})
	voxClient.on(Voximplant.ClientEvents.ConnectionEstablished, () => {
		observer.next(actions.voxEventsConnectionEstablished())
		voxClient.login('alicancandidate@talentenvoyapp.talentenvoy.voximplant.com', '00000000')
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
					displayName: 'alicancandidate display name', 
					result: true
				}
			}))
		}
	})

	return () => {}
})