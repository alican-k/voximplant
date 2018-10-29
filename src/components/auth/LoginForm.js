import React from 'react'
import { ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, withStateHandlers } from 'recompose'
import styles from './styles'
import { routeReset, logIn } from '../../actions'

const LoginForm = ({ email, password, setEmail, setPassword, routeReset, logIn}) =>
	<View style={styles.loginForm}>
		<TextInput style={styles.loginForm__text} placeholder='Enter Email' 
			keyboardType='email-address' autoCapitalize='none' underlineColorAndroid='transparent'
			onChangeText={val => setEmail(val)} />
		<TextInput style={styles.loginForm__text} placeholder='Enter Password' 
			autoCapitalize='none' secureTextEntry={true} underlineColorAndroid='transparent'
			onChangeText={val => setPassword(val)} />
		
		<TouchableOpacity style={styles.loginForm__button} onPress={() => logIn(email, password) }>
			<Text style={styles.loginForm__button__text}>Sign In</Text>
		</TouchableOpacity>

		<Text style={styles.loginForm__or}>OR</Text>

		<TouchableOpacity style={styles.loginForm__forgotButton} onPress={() => routeReset('Forgot') }>
			<Text style={styles.loginForm__forgotButton__text}>Forgot password?</Text>
		</TouchableOpacity>

		<View style={styles.loginForm__signUpContainer}>
			<Text style={styles.loginForm__signUp__description}>Haven't an account?</Text>
			<TouchableOpacity onPress={() => routeReset('SignUp') }>
				<Text style={styles.loginForm__signUpButton__text}>Sign up now</Text>
			</TouchableOpacity>
		</View>
	</View>
	
export default compose(
	connect(({ auth }) => ({ auth }), {routeReset, logIn}),
	branch(
		({ auth }) => auth.authStatus === 'LOGGING_IN' || auth.authStatus === 'LOGGED_IN',
		renderComponent(() => <ActivityIndicator />)
	),
	withStateHandlers(
		() => ({ email: '', password: '' }),
		{
			setEmail: ({email}) => val => ({email: val}),
			setPassword: ({password}) => val => ({password: val}),
		}
	)
)(LoginForm)

const LoggingIn = () => <ActivityIndicator />
