import React from 'react'
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withHandlers } from 'recompose'

const InputView = ({error, children}) => 
	<View style={error ? styles.normalView : styles.errorView}>
		{children}
	</View>

export const EmailInput = ({ type, placeholder, value, handler, insecure}) =>
	<TextInput 
		style={styles.textInput}
		placeholder={placeholder} 
		placeholderTextColor='#555555'
		value={value} 
		onChangeText={handler}
		secureTextEntry={type === 'password'}
	/>

export const PasswordInput = withStateHandlers({ insecure: false }, {
	toggleInsecure: (state, props) => () => ({ insecure: !state.insecure })
})(EmailInput)

const ButtonInput = ({ value, handler, viewStyle, textStyle }) =>
	<TouchableHighlight style={viewStyle}>
		<Text style={textStyle}>{value}</Text>
	</TouchableHighlight>

export const SigninInput = props => 
	<ButtonInput value='Sign in' viewStyle={[styles.normalView, styles.signinView]} textStyle={styles.signinText} />

export const GoogleInput = props => 
	<ButtonInput value='Sign in with Google' viewStyle={[styles.normalView, styles.googleView]} textStyle={styles.googleText} />
	
const styles = StyleSheet.create({
	normalView: {
		marginHorizontal: 28,
		marginTop: 30,
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: '#eeeeee',
		fontSize: 16,
		borderColor: '#dddddd',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
	},
	errorView: {
		backgroundColor: 'red'
	},
	textInput: {

	}
})