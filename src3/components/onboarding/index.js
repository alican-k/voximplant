import React from 'react'
import { Button, Text, TextInput, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { submitOnboarding } from '../../actions'
	
const Onboarding = ({ onChange, submit}) =>
	<View style={styles.container}>
		<Text>First Name:</Text>
		<TextInput style={styles.input} onChangeText={onChange} />

		<Button title='Next' onPress={submit} />
	</View>
	
export default compose(
	connect(null, { submitOnboarding }),
	withStateHandlers(
		{ name: '' },
		{ onChange: state => val => ({ name: val })}
	),
	withHandlers({
		submit: ({ submitOnboarding, name }) => () => submitOnboarding(name)
	})
)(Onboarding)
	
const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		padding: 4,
		marginTop: 4,
		backgroundColor: 'white',
		borderRadius: 4,
	}
})