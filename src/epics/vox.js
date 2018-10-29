import { PermissionsAndroid, Platform } from 'react-native'
import { Observable } from 'rxjs/Observable'
import { Voximplant } from 'react-native-voximplant'
import firebase from 'react-native-firebase'
import { compose, path } from 'ramda'
import { types, actions } from '../actions'
import CallManager from '../helpers/callManager'

const { empty, of } = Observable

const voxClient = Voximplant.getInstance()

const getProfileData = compose(path(['profile', 'profile', 'data']), a => a.getState())

export const voxClientStateEpic$ = (action$, store) => action$.ofType(types.PROFILE_CHANGED)
	.switchMap(action => {
		const profileData = getProfileData(store)
		return profileData && profileData.vox_userName ? voxEvents$(profileData) : empty()
	})

export const authResultEpic$ = (action$, store) => action$.ofType(types.VOX_AUTH_RESULT)
	.switchMap(action => action.payload.handlerArgs.AuthResult.result ? firebase.messaging().getToken() : empty)
	.do(token => console.log('fcm token: ', token))
	.do(token => token ? voxClient.registerPushNotificationsToken(token) : null)
	.switchMap(() => firebase.messaging().hasPermission())
	.switchMap(permission => firebase.messaging().requestPermission())
	.switchMap(() => Platform.OS === 'android'
		? PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.RECORD_AUDIO])
		: of(false)
	)
	.do(granted => granted === false ? granted : granted['android.permission.RECORD_AUDIO'] === 'granted' )
	.do(() => {
		if(Platform.OS === 'android') 
			createAndroidCallChannel()
	})
	.do(() => {
		const call = CallManager.getCall()
		if(call){
			console.log('handling push notification just after AUTH_RESULT')
			const voximplant = call.data.voximplant
			voxClient.handlePushNotification({ voximplant })
		}
		else{
			console.log('no need to handle push notification just after AUTH_RESULT')
		}
	})
	.do(() => Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice('Speaker'))
	.do(device => console.log('device: ', device))
	.ignoreElements()

const voxEvents$ = (profileData) => Observable.create(observer => {
	voxClient.on(Voximplant.ClientEvents.ConnectionClosed, () => {
		observer.next(actions.voxConnectionClosed())
	})
	voxClient.on(Voximplant.ClientEvents.ConnectionFailed, ConnectionFailed => {
		observer.next(actions.voxConnectionFailed({ ConnectionFailed }))
	})
	voxClient.on(Voximplant.ClientEvents.ConnectionEstablished, () => {
		observer.next(actions.voxConnectionEstablished())
		const { vox_userName, vox_password } = profileData
		const fullUserName = vox_userName + '@talentenvoyapp.talentenvoy.voximplant.com'
		voxClient.login(fullUserName, profileData.vox_password)
	})
	voxClient.on(Voximplant.ClientEvents.AuthResult, AuthResult => {
		observer.next(actions.voxAuthResult({ AuthResult }))
	})
	voxClient.on(Voximplant.ClientEvents.IncomingCall, IncomingCall => {
		observer.next(actions.voxIncomingCall({ IncomingCall }))
	})

	voxClient.getClientState().then(state => {
		console.log('statee: ', state)
		if(state === 'disconnected'){
			voxClient.connect()
		} 
		else if( state === 'connected'){
			const { vox_userName, vox_password } = profileData
			const fullUserName = vox_userName + '@talentenvoyapp.talentenvoy.voximplant.com'
			voxClient.login(fullUserName, password)
		}
		else if(state === 'logged_in') {
			observer.next(actions.voxAuthResult({
				AuthResult: {
					result: true
				}
			}))
		}
	})

	return () => {}
})

const createAndroidCallChannel = () => {
	const channel = new firebase.notifications.Android
		.Channel('call-channel', 'Call Channel', firebase.notifications.Android.Importance.Max)
		.setDescription('My apps call channel')
		.setLockScreenVisibility(firebase.notifications.Android.Visibility.Public)
	firebase.notifications().android.createChannel(channel)
}