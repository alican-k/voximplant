import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { logOut } from '../../actions'

const Calls = ({ vox, logOut }) =>
	<View style={styles.container}>
		<Text>calls</Text>

		<Button title='Log out' onPress={() => logOut()} />
	</View>
	
export default compose(
	connect(null , { logOut }),
)(Calls)
	
const styles = StyleSheet.create({
	container: {
		
	}
})