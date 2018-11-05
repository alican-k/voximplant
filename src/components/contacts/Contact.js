import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { callRequest } from '../../actions'

const Contact = ({ contact, call }) =>
	<TouchableHighlight onPress={call} underlayColor='#fefefe'>
		<View style={styles.container}>
			<Text style={styles.name}>{contact.name}</Text>
			<Text style={styles.location}>Malatya, MLX / Mobile Developer</Text>
			<Text style={styles.contract}>6 Months Contract ($18 - $24 per hour)</Text>
		</View>
	</TouchableHighlight>

export default compose(
	connect(null, { callRequest }),
	withHandlers({
		call: ({ callRequest, contact }) => () => callRequest(contact.vox_userName)
	})
)(Contact)
	

const styles = StyleSheet.create({
	container: {
		padding: 15,
		borderColor: '#EEEEEE',
		borderRadius: 5,
		borderWidth: 1
	},
	name: {
		fontSize: 18,
		color: '#454545',
		marginBottom: 6,
	},
	location: {
		fontSize: 16,
		color: '#252525',
		marginBottom: 6,		
	},
	contract: {
		fontSize: 16,
		color: '#454545',
		marginBottom: 6,		
	}
})