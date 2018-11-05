import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'

const Error = ({ auth }) =>
	<View style={styles.container}>
		<Text style={styles.text}>{auth.errorMessage}</Text>
	</View>
	
export default compose(
	connect(({ auth }) => ({ auth }), null),
	branch(({ auth }) => !Boolean(auth.errorMessage), renderNothing)
)(Error)
	
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 30,
		backgroundColor: '#F44F4F',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: 'white',		
	}
})