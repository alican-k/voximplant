import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native'
import NotificationsIOS from 'react-native-notifications'

export default class App extends React.Component {
	constructor() {
		super()
		NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
		NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
		NotificationsIOS.requestPermissions();
	}
	
	onPushRegistered(deviceToken) {
	    // TODO: Send the token to my server so it could send back push notifications...
		console.log("Device Token Received", deviceToken);
	}

	onPushRegistrationFailed(error) {
		// For example:
		//
		// error={
		//   domain: 'NSCocoaErroDomain',
		//   code: 3010,
		//   localizedDescription: 'remote notifications are not supported in the simulator'
		// }
		console.error(error);
	}
	
	componentWillUnmount() {
  		// prevent memory leaks!
  		NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
		NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
	}

	async componentDidMount() {
		// TODO: You: Do firebase things
		// const { user } = await firebase.auth().signInAnonymously();
		// console.warn('User -> ', user.toJSON());

		// await firebase.analytics().logEvent('foo', { bar: '123'});
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<Text>talent envoy</Text>
				</View>
			</ScrollView>
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
  
})