import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers } from 'recompose'
import { main } from '../helpers/state'
import { callUser } from '../actions'
	
const Comp = ({ voxClientState, displayName, isLoggedIn, _callUser }) =>
	<View style={styles.container}>
		<View>
			<Text>
				{ voxClientState }: { isLoggedIn &&  '"' + displayName + '"'}
			</Text>			
		</View>
		
		{ isLoggedIn && (
			<View style={styles.call}>
				<TouchableOpacity onPress={_callUser}>
					<Text>Click to call "alican"</Text>
				</TouchableOpacity>
			</View>
		)}
	</View>
	
export default compose(
	connect(main.self, { callUser }),
	withProps(main.pick(['voxClientState', 'displayName', 'isLoggedIn'])),
	withHandlers({
		_callUser: props => () => {props.callUser('alican')}
	})
)(Comp)
	
const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingTop: 24
	},
	call: {
		margin: 15,
		backgroundColor: '#dddddd',
		borderRadius: 4,
		padding: 6,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
})