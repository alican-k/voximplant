import React from 'react'
import { Button, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'
import { routeReset, sendResetEmail } from '../../actions'
import styles from './styles'
import AuthError from './AuthError'

const ForgotScreen = ({ sendResetEmail, email, setEmail, routeReset }) =>
	<ScrollView style={styles.forgotScreen}>
		<AuthError />
		<Text style={styles.forgotScreen__description}>
			Instructions will be sent to your email
		</Text>
		<TextInput style={styles.loginForm__text} placeholder='Enter Email'  
			keyboardType='email-address' autoCapitalize='none' underlineColorAndroid='transparent'
			onChangeText={val => setEmail(val)} />

		<TouchableOpacity style={styles.loginForm__button} onPress={() => sendResetEmail(email) }>
			<Text style={styles.loginForm__button__text}>Send</Text>
		</TouchableOpacity>

		<View style={styles.loginForm__signUpContainer}>
			<Text style={styles.loginForm__signUp__description}>Go back for</Text>
			<TouchableOpacity onPress={() => routeReset('Auth') }>
				<Text style={styles.loginForm__signUpButton__text}>Log in</Text>
			</TouchableOpacity>
		</View>
	</ScrollView>
	
export default compose(
	connect(({ }) => ({ }), {sendResetEmail, routeReset}),
	withStateHandlers(
		() => ({ email: '' }),
		{
			setEmail: ({ email }) => val => ({ email: val })
		}
	)
)(ForgotScreen)