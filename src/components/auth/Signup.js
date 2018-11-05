import React from 'react'
import { Image, StatusBar, Text, View, ScrollView, StyleSheet } from 'react-native'
// import  from 'react-native-debug-stylesheet'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import TopInfo from './TopInfo'
import { NameInput, EmailInput, PasswordInput, SignupButton, GoogleButton, HaveAccountButton } from './input'
import Or from './Or'
import Error from './Error'
import { signUp, changePage } from '../../actions'

const Signup = ({ nameInput, emailInput, passwordInput, nameHandler, emailHandler, passwordHandler, signupHandler, gotoLogin }) =>
	<View style={styles.container}>
		<StatusBar barStyle='light-content' />
		<Error />
		<TopInfo />
		<View style={styles.form}>
			<ScrollView>
				<NameInput type='text' value={nameInput} handler={nameHandler} />
				<EmailInput type='email' value={emailInput} handler={emailHandler} />
				<PasswordInput type='password' value={passwordInput} handler={passwordHandler} />
				<SignupButton handler={signupHandler} />
				<Or />
				<GoogleButton handler={() => console.log('Sign in with google pressed')} />
				<HaveAccountButton handler={gotoLogin} />
			</ScrollView>
		</View>	
	</View>
	
export default compose(
	connect(null, { signUp, changePage }),
	withStateHandlers({ nameInput: '', emailInput: '', passwordInput: '' }, {
		nameHandler: (state, props) => val => ({ nameInput: val }),		
		emailHandler: (state, props) => val => ({ emailInput: val }),
		passwordHandler: (state, props) => val => ({ passwordInput: val }),
		signupHandler: (state, props) => () => props.signUp(state.nameInput ,state.emailInput, state.passwordInput),
		gotoLogin: (state, { changePage }) => () => changePage('LOG_IN')
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