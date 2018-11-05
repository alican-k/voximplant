import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Or = () =>
	<View style={styles.container}>
		<View style={styles.saperator} />
		<Text style={styles.text}>OR</Text>
		<View style={styles.saperator} />		
	</View>

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	saperator: {
		height: 1,
		backgroundColor: '#cccccc',
		flex: 1,
	},
	text: {
		fontSize: 18,
		marginHorizontal: 10
	}
})

export default Or