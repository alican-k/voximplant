import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'

const IncomingIndex = () =>
	<View style={styles.container}>
		<Text>incoming screen</Text>
	</View>

export default compose(
	connect(null, null),
)(IncomingIndex)

const styles = StyleSheet.create({
	container: {
		
	}
})