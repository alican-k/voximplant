import React from 'react'
import { Platform, Image, Text, TextInput, TouchableHighlight, View, StyleSheet, } from 'react-native'
import { withStateHandlers } from 'recompose'
import images from '../../../assets/images'

const viewStyle = (error, focused) => {
	const stylesArr = [styles.normalTextContainer]
	if(error) stylesArr.push(styles.errorTextContainer)
	if(focused) stylesArr.push(styles.focusedTextContainer)
	return stylesArr
} 

export const EmailInput = withStateHandlers(
	{ focused: false }, {
		toggleFocused: (state, props) => () => ({ focused: !state.focused })
	}
)(
	({ value, handler, error, focused, toggleFocused }) => 
		<View style={viewStyle(error, focused)}>
			<TextInput 
				style={styles.emailInput}
				placeholder='E-mail Address' 
				placeholderTextColor='#555555'
				autoCapitalize='none'
				onFocus={toggleFocused}
				onBlur={toggleFocused}
				value={value} 
				onChangeText={handler}
			/>
		</View>
)
export const PasswordInput = withStateHandlers(
	{ secure: true, focused: false }, {
		toggleSecure: (state, props) => () => ({ secure: !state.secure }),
		toggleFocused: (state, props) => () => ({ focused: !state.focused })
	}
)(
	({ value, handler, error, secure, toggleSecure, focused, toggleFocused }) => 
		<View style={viewStyle(error, focused)}>
			<TextInput 
				style={styles.emailInput}
				placeholder='Password'
				placeholderTextColor='#555555'
				autoCapitalize='none'
				onFocus={toggleFocused}
				onBlur={toggleFocused}
				value={value} 
				onChangeText={handler}
				secureTextEntry={secure}
			/>
			<TouchableHighlight onPress={toggleSecure} underlayColor='#eeeeee'>
				<Image source={secure ? images.eyeOff : images.eyeOn} />
			</TouchableHighlight>
		</View>
)
export const NameInput = withStateHandlers(
	{ focused: false }, {
		toggleFocused: (state, props) => () => ({ focused: !state.focused })
	}
)(
	({ value, handler, error, focused, toggleFocused }) => 
		<View style={viewStyle(error, focused)}>
			<TextInput 
				style={styles.emailInput}
				placeholder='Name Surname' 
				placeholderTextColor='#555555'
				autoCapitalize='none'
				onFocus={toggleFocused}
				onBlur={toggleFocused}
				value={value} 
				onChangeText={handler}
			/>
		</View>
)

const SignButton = ({ value, handler, error }) => 
	<View style={styles.signinContainer}>
		<TouchableHighlight style={styles.innerContainer} onPress={handler} underlayColor='#CD4C2E'>
			<Text style={styles.signinText}>{value}</Text>
		</TouchableHighlight>
	</View>

export const SigninButton = props => <SignButton {...props} value='Sign in' />
export const SignupButton = props => <SignButton {...props} value='Sign up' />

export const ForgotPasswordButton = ({ handler }) => 
	<TouchableHighlight style={styles.forgotContainer} onPress={handler} underlayColor='white'>
		<Text style={styles.forgotText}>Forgot Password?</Text>
	</TouchableHighlight>

export const GoogleButton = ({ value, handler, error }) => 
	<View style={styles.googleContainer}>
		<TouchableHighlight style={styles.innerContainer} onPress={handler} underlayColor='#CDE0F4'>
			<Text style={styles.googleText}>Sign in with Google</Text>
		</TouchableHighlight>
	</View>

export const SignupNavigateButton = ({ handler }) => 
	<TouchableHighlight style={styles.forgotContainer} onPress={handler} underlayColor='white'>
		<Text style={styles.forgotText}>Don't have account yet? Sign up now</Text>
	</TouchableHighlight>


const styles = StyleSheet.create({
	normalTextContainer: {
		marginHorizontal: 28,
		marginTop: 23,
		paddingHorizontal: 20,
		paddingVertical: Platform.OS === 'android' ? 3 : 16,
		backgroundColor: '#eeeeee',
		borderColor: '#dddddd',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	errorTextContainer: {
		backgroundColor: 'red',
	},
	focusedTextContainer: {
		borderColor: '#888888'
	},
	emailInput: {
		fontSize: 16,
		flex: 1
	},
	signinContainer: {
		display: 'flex',
		alignItems: 'center',
		marginHorizontal: 28,
		marginTop: 23,
		backgroundColor: '#FF4C2E',
		borderRadius: 5,		
	},
	signinText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	forgotContainer: {
		marginTop: 23,
	},
	forgotText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#23B1D3',
		fontWeight: 'bold'
	},
	googleContainer: {
		display: 'flex',
		alignItems: 'center',
		marginHorizontal: 28,
		marginTop: 23,
		backgroundColor: '#CCEBFF',
		borderRadius: 5,		
	},
	googleText: {
		color: '#2FB1C6',
		fontSize: 18,
		fontWeight: 'bold',
	},
	innerContainer: {
		alignSelf: 'stretch',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		borderRadius: 5,
	}
})

