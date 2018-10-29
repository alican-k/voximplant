import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
	
const Calls = ({ vox }) =>
	<View style={styles.container}>
		<Text>calls</Text>
	</View>
	
export default compose(
	connect(null , null),
)(Calls)
	
const styles = StyleSheet.create({
	container: {
	}
})