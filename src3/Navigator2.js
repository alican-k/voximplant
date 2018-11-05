import React from 'react'
//import { } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import AuthScreen from './components/auth/AuthScreen'
import SignUpScreen from './components/auth/SignUpScreen'
import ForgotScreen from './components/auth/ForgotScreen'
import ResetEmailSentScreen from './components/auth/ResetEmailSentScreen'
import Onboarding from './components/onboarding'
import ContactsScreen from './components/contacts'
import CallsScreen from './components/calls'

const Tabs = createBottomTabNavigator({
	Calls: {
		screen: createStackNavigator({
			Calls: {
				screen: CallsScreen,
				navigationOptions: {
					title: 'Calls'
				}
			}
		})
	},
	Contacts: {
		screen: createStackNavigator({
			Contacts: {
				screen: ContactsScreen,
				navigationOptions: {
					title: 'Contacts'
				}
			}
		})
	},
}, {
	tabBarOptions: {
		style: {
			backgroundColor: 'white',
		},
	},
	swipeEnabled: false,
})

const Stack = createStackNavigator({
	Auth: {
		screen: AuthScreen,
		navigationOptions: {
			header: null
		}
	},
	Onboarding: {
		screen: Onboarding,
		navigationOptions: {
			header: null
		}
	},
	Tabs: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	SignUp: {
		screen: SignUpScreen,
		navigationOptions: {
			header: null
		}
	},
	Forgot: {
		screen: ForgotScreen,
		navigationOptions: {
			header: null
		}
	},
	ResetEmailSent: {
		screen: ResetEmailSentScreen,
		navigationOptions: {
			header: null
		}
	}
})

export default Stack