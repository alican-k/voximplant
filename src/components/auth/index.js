import React from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import auth from '../../helpers/state.auth'
import background from '../../assets/images/Background.png'
import Loading from './Loading'
import Login from './Login'
import Signup from './Signup'

const AuthIndex = ({ page }) => 
	<ImageBackground source={background} style={styles.background}>
		{{
			LOADING		: <Loading />,
			LOG_IN		: <Login />,
			SIGN_UP		: <Signup />
		}[page]}
	</ImageBackground>

export default compose(
	connect(auth.self, null),
	withProps(auth.pick(['page'])),
)(AuthIndex)

 
	
const styles = StyleSheet.create({
	background: {
		width: '100%', 
		height: '100%',
	}
})

/*



*/