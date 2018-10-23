import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers } from 'recompose'
import { main } from '../helpers/state'
import { callUserRequest, callHangupRequest, callAnswer, disconnect, loginAs } from '../actions'
import users from '../helpers/users'

const Comp = ({ 
	voxClientState, displayName, isLoggedIn, isClosed, call, totalCallState, actionState, 
	_callUserRequest, _callHangupRequest, _callAnswer, _disconnect, loginAs
 }) =>
	<View style={styles.container}>
		<View>
			<Text>
				{ voxClientState }: { isLoggedIn &&  '"' + displayName + '"'}
			</Text>			
		</View>

		{ isClosed && (
			<View>
				<Text>Login as:</Text>
				<TouchableOpacity style={styles.call} onPress={() => loginAs(0)}>
					<Text>alican</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.call} onPress={() => loginAs(1)}>
					<Text>alicancandidate</Text>
				</TouchableOpacity>
			</View>
		)}

		{ isLoggedIn && (
			<View style={styles.call}>
				<TouchableOpacity onPress={_disconnect}>
					<Text>Disconnect</Text>
				</TouchableOpacity>
			</View>
		)}
		
		{ isLoggedIn && actionState === 'NONE' && (
			<View style={styles.call}>
				<TouchableOpacity onPress={_callUserRequest}>
					<Text>Click to call "{users.getCallee().userName}"</Text>
				</TouchableOpacity>
			</View>
		)}
		{ actionState === 'ABLE_TO_HANGUP' && (
			<View style={styles.call}>
				<TouchableOpacity onPress={_callHangupRequest}>
					<Text>Hangup</Text>
				</TouchableOpacity>
			</View>
		)}
		{ actionState === 'ALERTING' && (
			<View style={styles.call}>
				<TouchableOpacity onPress={_callAnswer}>
					<Text>Answer</Text>
				</TouchableOpacity>
			</View>
		)}

		{ isLoggedIn && <Text>Call State: {totalCallState}</Text> }
	</View>
	
export default compose(
	connect(main.self, { callUserRequest, callHangupRequest, callAnswer, disconnect, loginAs }),
	withProps(main.pick(['voxClientState', 'displayName', 'isLoggedIn', 'totalCallState', 'call', 'actionState', 'isClosed'])),
	withHandlers({
		_callUserRequest: props => () => {props.callUserRequest(users.getCallee().userName)},
		_callHangupRequest: props => () => props.callHangupRequest(),
		_callAnswer: props => () => props.callAnswer(),
		_disconnect: props => () => props.disconnect()		
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