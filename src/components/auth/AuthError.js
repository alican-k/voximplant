import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { closeAuthError } from '../../actions'
import styles from './styles'

const AuthError = ({ auth, closeAuthError }) =>
	<View style={styles.authError}>
		<Text style={styles.authError__text}>Error: {auth.errorMessage}</Text>
		<TouchableOpacity onPress={() => closeAuthError() }>
			<Text style={styles.authError__close}>Close</Text>
		</TouchableOpacity>
	</View>
	
export default compose(
	connect(({ auth }) => ({ auth }), { closeAuthError }),
	branch(
		({ auth }) => !Boolean(auth.errorMessage),
		renderNothing
	)
)(AuthError)