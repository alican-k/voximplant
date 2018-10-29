import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { StyleSheet } from 'react-native'
//import StyleSheet from 'react-native-debug-stylesheet'

const styles = StyleSheet.create({
	authScreen: {
		padding: 20,
	}, 
	authScreen__title: {
		fontSize: 30,
		textAlign: 'center',
	},
	authScreen__subTitle: {
		fontSize: 18,
		textAlign: 'center',
	},
	loginForm: {
	},
	loginForm__text: {
		fontSize: 15,
		margin: 8,
		marginHorizontal: 45,
		height: 40,
		borderWidth: 1,
		borderColor: '#eeeeee',
		borderRadius: 20,
		textAlign: 'center',
	},
	loginForm__button: {
		height: 36,
		borderRadius: 18,
		backgroundColor: '#2196F3',
		alignItems: 'center', justifyContent: 'center',
		margin: 18,
		marginHorizontal: 45,
	},
	loginForm__button__text: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
		letterSpacing: 0.5,
	},
	loginForm__or: {
		alignSelf: 'center',
		marginTop: 14,
		fontSize: 14,
		color: '#aaaaaa'
	},
	loginForm__forgotButton: {
		height: 36,
		borderWidth: 1,
		borderColor: '#aaaaaa',
		borderRadius: 18,
		backgroundColor: 'white',
		alignItems: 'center', justifyContent: 'center',
		margin: 18,
		marginHorizontal: 45,
	},
	loginForm__forgotButton__text: {
		color: '#aaaaaa',
		fontSize: 14,
		fontWeight: 'bold',
		letterSpacing: 0.5,
	},
	loginForm__signUpContainer: {
		marginTop: 5,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center'
	},
	loginForm__signUp__description: {
		color: '#aaaaaa',
		fontSize: 12,
		marginRight: 4,
	},
	loginForm__signUpButton__text: {
		color: '#2196F3',
		fontSize: 12,
	},
	profileScreen: {
		position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
		backgroundColor: 'white',
	},
	profileScreen__logout: {
		margin: 70,
	},
	authScreen: {
		position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
		backgroundColor: 'white',
	},
	authScreen__appLogo: {
		width: 180, height: 180,
		alignSelf: 'center',
		marginTop: 50,
	},
	signUpScreen: {
		position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
		backgroundColor: 'white',
	},
	signUpScreen__appLogo: {
		width: 100, height: 100,
		alignSelf: 'center',
		marginTop: 30,
	},
	forgotScreen: {
		position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
		backgroundColor: 'white',
	},
	forgotScreen__description: {
		alignSelf: 'center',
		fontSize: 14,
		letterSpacing: 0.5,
		color: '#aaaaaa',
		marginTop: 120,
		marginBottom: 30,
	},
	authError: {
		position: 'absolute', top: 40, left: 0, right: 0,
		//height: 40,
		padding: 10,
		backgroundColor: 'orange',
		justifyContent: 'center', alignItems: 'center',
		shadowColor: 'orange',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {width: 2, height: 2}
	},
	authError__text: {
		textAlign: 'center',
		marginBottom: 10,
		fontSize: 12,
	},
	authError__close: {
		color: '#2196F3',
		fontSize: 14,
	},
})

export default styles