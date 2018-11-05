import React from 'react'
import { Image, View, StatusBar, StyleSheet } from 'react-native'
import images from '../../assets/images'
	
const Loading = () =>
	<View style={styles.container}>
		<StatusBar hidden />
		<Image style={styles.logo} source={images.logoFull} />
		<Image style={styles.texts} source={images.texts} />
	</View>
	
export default Loading
	
const styles = StyleSheet.create({
	container: {
		width: '100%', 
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		marginBottom: 20
	},
	texts: {

	}
})