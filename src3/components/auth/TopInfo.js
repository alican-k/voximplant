import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import images from '../../assets/images'
	
const TopInfo = () =>
	<View style={styles.container}>
		<Image style={styles.logo} source={images.logo} />
		<Image style={styles.texts} source={images.texts} />		
		<Text style={styles.description}>Talent Envoy is a startup helping</Text>
		<Text style={styles.description}>professionals finding their next jobs.</Text>	
	</View>
	
export default TopInfo
	
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	logo: {
		marginTop: 20
	}, 
	texts: {
		marginTop: 10,
		marginBottom: 30,
	},
	description: {
		color: 'white',
		margin: 5,
	}

})