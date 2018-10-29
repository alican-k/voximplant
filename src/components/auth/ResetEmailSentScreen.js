import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { routeReset } from '../../actions'
	
const ResetEmailSent = ({ routeReset }) =>
	<View style={styles.forgotScreen}>
		<Text style={styles.forgotScreen__description}>
			Please check your inbox to reset your password
		</Text>
		<View style={styles.loginForm__signUpContainer}>
			<Text style={styles.loginForm__signUp__description}>Go back for</Text>
			<TouchableOpacity onPress={() => routeReset('Auth') }>
				<Text style={styles.loginForm__signUpButton__text}>Log in</Text>
			</TouchableOpacity>
		</View>
	</View>
	
export default connect(({ }) => ({ }),{ routeReset })(ResetEmailSent)