import firebase from 'react-native-firebase'
import { Linking } from 'react-native'

export default async (message) => {
	console.log('bg message received:', message)
	
	const notification = new firebase.notifications.Notification()
		.setNotificationId('notificationId')
		.setTitle('My notification title')
		.setBody('My notification body')
		.setData({
			key1: 'value1',
			key2: 'value2',
		})
	notification
		.android.setChannelId('call-channel')
		.android.setSmallIcon('ic_launcher')
		.android.setVisibility(firebase.notifications.Android.Visibility.Public)

	return firebase.notifications().displayNotification(notification)
		.then((...params) => {
			console.log('..params: ', params)
			return Linking.openURL('peopleapp://people/0')
		})

	
	// return Linking.openURL('peopleapp://people/0')
    //return Promise.resolve()
}