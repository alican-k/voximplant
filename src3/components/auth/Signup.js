import React from 'react'
import { Image, StatusBar, Text, View, ScrollView, StyleSheet } from 'react-native'
// import  from 'react-native-debug-stylesheet'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import TopInfo from './TopInfo'
import { NameInput, EmailInput, PasswordInput, SignupButton, GoogleButton, SignupNavigateButton } from './input'
import Or from './Or'
import { signUp } from '../../actions'

const Signup = ({ nameInput, emailInput, passwordInput, nameHandler, emailHandler, passwordHandler, signupHandler }) =>
	<View style={styles.container}>
		<StatusBar barStyle='light-content' />
		<TopInfo />
		<View style={styles.form}>
			<ScrollView>
				<NameInput type='text' value={nameInput} handler={nameHandler} />
				<EmailInput type='email' value={emailInput} handler={emailHandler} />
				<PasswordInput type='password' value={passwordInput} handler={passwordHandler} />
				<SignupButton handler={signupHandler} />
				<Or />
				<GoogleButton handler={() => console.log('Sign in with google pressed')} />
				<SignupNavigateButton handler={() => console.log('Sign in with google pressed')} />
			</ScrollView>
		</View>	
	</View>
	
export default compose(
	connect(null, { signUp }),
	withStateHandlers({ nameInput: '', emailInput: '', passwordInput: '' }, {
		nameHandler: (state, props) => val => ({ nameInput: val }),		
		emailHandler: (state, props) => val => ({ emailInput: val }),
		passwordHandler: (state, props) => val => ({ passwordInput: val }),
		signupHandler: (state, props) => () => props.signUp(state.nameInput ,state.emailInput, state.passwordInput)
	}),
)(Signup)
	
const styles = StyleSheet.create({
	container: {
		width: '100%', 
		height: '100%',
		display: 'flex',
	},
	form: {
		backgroundColor: 'white',
		flex: 2,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		display: 'flex',
	}
})