import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import AuthScreen from './components/auth'
import ContactsScreen from './components/contacts'
import IncomingScreen from './components/incoming'
import OutgoingScreen from './components/outgoing'

const Stack = createStackNavigator({
	Auth: {
		screen: AuthScreen,
		navigationOptions: {
			header: null
		}
	},
	Contacts: {
		screen: ContactsScreen,
		navigationOptions: {
			header: null
		}
	},
	Incoming: {
		screen: IncomingScreen,
		navigationOptions: {
			header: null
		}
	},
	Outgoing: {
		screen: OutgoingScreen,
		navigationOptions: {
			header: null
		}
	}
})

export default Stack