import firebase from 'react-native-firebase'
import { Linking } from 'react-native'
//import CallManager from './src/helpers/callManager'

export default async (message) => {
	console.log('bg message received:', message)

//	CallManager.setCall(message)
	return Linking.openURL('peopleapp://people/0')
	
	// const notification = new firebase.notifications.Notification()
	// 	.setNotificationId('notificationId')
	// 	.setTitle('My notification title')
	// 	.setBody('My notification body')
	// 	.setData({
	// 		key1: 'value1',
	// 		key2: 'value2',
	// 	})
	// notification
	// 	.android.setChannelId('call-channel')
	// 	.android.setSmallIcon('ic_launcher')
	// 	.android.setVisibility(firebase.notifications.Android.Visibility.Public)

	// return firebase.notifications().displayNotification(notification)
	// 	.then((...params) => {
	// 		console.log('..params: ', params)
	// 		return Linking.openURL('peopleapp://people/0')
	// 	})

	
	// return Linking.openURL('peopleapp://people/0')
    //return Promise.resolve()
}