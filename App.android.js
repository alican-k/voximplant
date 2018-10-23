import React, {Component} from 'react'
import {Linking, Platform, StyleSheet, Text, View, PermissionsAndroid} from 'react-native'
import { Voximplant } from 'react-native-voximplant'
import firebase from 'react-native-firebase'

const init = async (comp) => {
	const client = Voximplant.getInstance()
	let state = await client.getClientState()
	console.log('state: ', state)
	
	if(state === Voximplant.ClientState.DISCONNECTED)
		state = await client.connect()
	
		
	state = await client.getClientState()
	console.log('state: ', state)

	if(state !== 'logged_in')
		await client.login("alicancandidate@talentenvoyapp.talentenvoy.voximplant.com", "00000000")

	state = await client.getClientState()
	console.log('state: ', state)

	const fcmToken = await firebase.messaging().getToken()
	if (fcmToken) {
		console.log('fcmToken: ', fcmToken)
		client.registerPushNotificationsToken(fcmToken)
	} else {
		console.log('fcmToken: no fcm token')
	}

	let permissionsEnabled = await firebase.messaging().hasPermission()
	console.log('permissions: ', permissionsEnabled)
	if(!permissionsEnabled) {
		try {
			await firebase.messaging().requestPermission();
		} catch (error) {
			console.log('user did not enabled permissions')
		}
	}
	if(!permissionsEnabled) return

	console.log('onMessage handler is registering..')
	comp.messageListener = firebase.messaging().onMessage(message => {
		// Process your message as required
		console.log('message received ****: ', message)
	});
	
	client.on(Voximplant.ClientEvents.IncomingCall, async (e) => {
		console.log('incoming call received: ', e)

		try {
            if (Platform.OS === 'android') {
                let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
                // if (withVideo) {
                //     permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
                // }
                const granted = await PermissionsAndroid.requestMultiple(permissions);
                const recordAudioGranted = granted['android.permission.RECORD_AUDIO'] === 'granted';
                // const cameraGranted = granted['android.permission.CAMERA'] === 'granted';
                if (recordAudioGranted) {
					console.log('record_audio granted')
					e.call.answer()
                } else {
                    console.log('record_audio not granted')
                    return
                }
            }
        } catch (e) {
            console.warn('answer call error:' + e)
            return;
        }
	})
}

export default class App extends Component {
	componentWillMount() {
		init(this)
	}
	componentDidMount() {
		Linking.getInitialURL().then((url) => {
			if (url) {
				console.log('Initial url is: ' + url);
			} else {
				console.log('Initial url is not absent')
			}
		}).catch(err => console.error('An error occurred', err))
	}
	componentWillUnmount() {
		console.log('unmounting message listener')
		this.messageListener()
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to React Native!</Text>
			</View>
		)
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
