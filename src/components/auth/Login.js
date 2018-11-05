import React from 'react'
import { Image, StatusBar, Text, View, ScrollView, StyleSheet } from 'react-native'
// import  from 'react-native-debug-stylesheet'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import TopInfo from './TopInfo'
import { EmailInput, PasswordInput, SigninButton, ForgotPasswordButton, GoogleButton, DontHaveAccountButton } from './input'
import Or from './Or'
import Error from './Error'
import { logIn, changePage } from '../../actions'

const Login = ({ emailInput, passwordInput, emailHandler, passwordHandler, signinHandler, gotoSignup }) =>
	<View style={styles.container}>
		<StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
		<Error />
		<TopInfo />
		<View style={styles.form}>
			<ScrollView>
				<EmailInput type='email' 
					value={emailInput} handler={emailHandler} />
				<PasswordInput type='password' 
					value={passwordInput} handler={passwordHandler} />
				<SigninButton handler={signinHandler} />
				<ForgotPasswordButton handler={() => console.log('forgot password pressed')} />
				<Or />
				<GoogleButton handler={() => console.log('Sign in with google pressed')} />
				<DontHaveAccountButton handler={gotoSignup} />
			</ScrollView>
		</View>	
	</View>
	
export default compose(
	connect(null, { logIn, changePage }),
	withStateHandlers({ emailInput: '', passwordInput: '' }, {
		emailHandler: (state, props) => val => ({ emailInput: val }),
		passwordHandler: (state, props) => val => ({ passwordInput: val }),
		signinHandler: (state, props) => () => props.logIn(state.emailInput, state.passwordInput),
		gotoSignup: (state, { changePage }) => () => changePage('SIGN_UP')
	}),
)(Login)
	
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
		paddingBottom: 8,
	}
})