import React from 'react'
import { Button, Image, Text, ScrollView, StyleSheet } from 'react-native'
// import styles from './styles'
import LoginForm from './LoginForm'
import AuthError from './AuthError'
//import { appLogo } from '../../assets'

const AuthScreen = ({ auth }) =>
	<ScrollView contentContainerStyle={{marginTop: 30}}>
			{/* <Image source={appLogo} style={styles.authScreen__appLogo}/> */}
			<AuthError />
			<LoginForm />
	</ScrollView>

export default AuthScreen

const styles = StyleSheet.create({
	conteiner: {
		marginTop: 20
	}
})

