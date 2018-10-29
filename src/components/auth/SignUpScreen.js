import React from 'react'
import { Button, Image, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'
import { routeReset, signUp } from '../../actions'
// import { appLogo } from '../../assets'
import styles from './styles'
import AuthError from './AuthError'

const SignUpScreen = ({email, password, setEmail, setPassword, routeReset, signUp}) =>
	<ScrollView style={styles.signUpScreen}>
		<View style={styles.loginForm}>
			{/* <Image source={appLogo} style={styles.signUpScreen__appLogo}/> */}

			<AuthError />

			<TextInput style={styles.loginForm__text} placeholder='Email'
				keyboardType='email-address' autoCapitalize='none' underlineColorAndroid='transparent'
				onChangeText={val => setEmail(val)} />
			<TextInput style={styles.loginForm__text} placeholder='Password' 
				autoCapitalize='none' secureTextEntry={true} underlineColorAndroid='transparent'

				onChangeText={val => setPassword(val)} />

			<TouchableOpacity style={styles.loginForm__button} onPress={() => signUp(email, password) }>
				<Text style={styles.loginForm__button__text}>Sign Up</Text>
			</TouchableOpacity>
			
			<Text style={styles.loginForm__or}>OR</Text>

			<View style={styles.loginForm__signUpContainer}>
				<Text style={styles.loginForm__signUp__description}>Have an account?</Text>
				<TouchableOpacity onPress={() => routeReset('Auth') }>
					<Text style={styles.loginForm__signUpButton__text}>Sign in</Text>
				</TouchableOpacity>
			</View>
		</View>
	</ScrollView>
	
export default compose(
	connect(null, {routeReset, signUp}),
	withStateHandlers(
		() => ({ email: '', name: '', password: '' }),
		{
			setEmail: ({ email }) => val => ({ email: val }),
			setName: ({ name }) => val => ({ name: val }),			
			setPassword: ({ password }) => val => ({ password: val }),
		}
	)
)(SignUpScreen)

  