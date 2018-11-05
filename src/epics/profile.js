import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { PermissionsAndroid, Platform } from 'react-native'
import { replace } from 'ramda'
import { Voximplant } from 'react-native-voximplant'
import firebase from 'react-native-firebase'
import { types, actions } from '../actions'
import { fromDocRef$, profileRef } from '../helpers/firebase'
import CallManager from '../helpers/callManager'

const voxClient = Voximplant.getInstance()

const { concat, empty, fromPromise, merge, of } = Observable

export const loggedInEpic = (action$, store) => action$.ofType(types.LOGGED_IN)
	.switchMap(action => profileRef().get())
	.switchMap(profile => profile.data()
		? of(actions.profileIsSet(profile.data()))
		: of(actions.profileIsNotSet())
	)
	
export const profileIsNotSetEpic = (action$, store) => action$.ofType(types.PROFILE_IS_NOT_SET)
	.switchMap(action => {
		const { name, email } = store.getState().auth
		return fromPromise(addUserRequestUrl(name, email))
			.switchMap(voxResponse => {
				if(voxResponse.error){
					console.log('vox error: ', voxResponse.error)
					return empty()
				} 
				return of(voxResponse)
			})
			.switchMap(voxResponse => profileRef().set(voxResponse).then(() => voxResponse))
			.map(voxResponse => actions.profileIsSet(voxResponse))
	})

export const profileIsSetEpic = (action$, store) => action$.ofType(types.PROFILE_IS_SET)
	.switchMap(action => concat(
		of(actions.routeReset('Contacts')),
		voxEvents$(action.payload.profile)
	))
	
export const authResultEpic = (action$, store) => action$.ofType(types.VOX_AUTH_RESULT)
	.switchMap(action => action.payload.handlerArgs.AuthResult.result 
		? firebase.messaging().getToken() 
		: empty
	)
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
	.switchMap(() => Voximplant.Hardware.AudioDeviceManager.getInstance().getAudioDevices())
	.do(devices => console.log('devices: ', devices))
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

const addUserRequestUrl = (name, email) => {
	const details = {
		account_id: '2526888',
		api_key: '52568c3d-fc42-4480-bd63-e26f364d5e0f',
		cmd: 'AddUser',
		user_name: replace('@', '__at__', email),
		user_password: '000000',
		user_display_name: name,
		user_custom_data: 'customdatablabla',
		application_name: 'talentenvoyapp.talentenvoy.voximplant.com'
	}
	let formBody = [];
	for (const property in details) {
	  const encodedKey = encodeURIComponent(property)
	  const encodedValue = encodeURIComponent(details[property])
	  formBody.push(encodedKey + "=" + encodedValue)
	}
	formBody = formBody.join("&")
	
	return fetch('https://api.voximplant.com/platform_api', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody
		})
		.then(response => response.json())
		.then(json => {
			if(json.error){
				console.log('Error while add user to VOXIMPLANT: ', json.error)
				return json
			}
			return {
				name: name, 
				vox_id: json.id, 
				vox_displayName: details.user_display_name, 
				vox_userName: details.user_name, 
				vox_password: details.user_password
			}
		})
}

// https://api.voximplant.com/platform_api?
// cmd=AddUser&account_id=2526888&api_key=52568c3d-fc42-4480-bd63-e26f364d5e0f
// &user_name=ali&user_password=000000&user_display_name=ali&mobile_phone=+905555586155&user_custom_data=mobiledeveloper&application_name=talentenvoyapp.talentenvoy.voximplant.com



// export const loggedInEpic = action$ => action$.ofType(types.LOGGED_IN)
// 	.switchMap(action => {
// 		const obs1$ = fromDocRef$(profileRef())
// 		const obs2$ = obs1$.take(1)
// 		return merge(
// 			obs1$.map(actions.profileChanged),
// 			obs2$.map(profile => actions.routeReset(profile.data ? 'Tabs' : 'Onboarding'))
// 		)		
// 	})

// export const loggedInEpic = (action$, store) => action$.ofType(types.LOGGED_IN)
// 	.switchMap(action => profileRef().get())
// 	.switchMap(profile => profile.data()
// 		? concat(of(actions.profileFetched(profile.data())), of(actions.routeReset('Contacts')))
// 		: fromPromise(addUserRequestUrl(store.getState().auth.name, store.getState().auth.user))
// 			.switchMap(voxResponse => {
// 				if(voxResponse.error){
// 					console.log('vox error: ', voxResponse.error)
// 					return empty()
// 				} 
// 				return of(voxResponse)
// 			})
// 			.switchMap(res => profileRef().set(res))
// 			.map(() => actions.routeReset('Contacts'))
// 	)

// export const submitOnboardingEpic = (action$, store) => action$.ofType(types.SUBMIT_ONBOARDING)
// .switchMap(action => addUserRequestUrl(action.payload.name, store.getState().auth.user))
// .switchMap(voxResponse => voxResponse.error ? empty() : of(voxResponse))
// .switchMap(res => profileRef().set(res))
// .map(() => actions.routeReset('Tabs'))