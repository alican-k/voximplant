import React from 'react'
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { callRequest, callHangupRequest, callAnswer, callReject } from '../../actions'

const Contacts = ({ profile, vox, call, callUser, hangup, answer, reject }) => {
	let actionState = 'ABLE_TO_HANGUP'
	if(!Boolean(call.call)) actionState = 'NONE'
	else if(call.call.state === 'ALERTING') actionState = 'ALERTING'

	return (
		<View style={styles.container}>
			<View style={styles.clientInfo}>
				<Text>Client State: {vox.voxState}</Text>
				{ vox.voxState === 'LOGGED_IN' && <Text>Vox display name: {profile.profile.data.vox_displayName}</Text>}
			</View>
			
			{ vox.voxState === 'LOGGED_IN' && actionState === 'NONE' && (
				<Button style={styles.call} title='Click to call Alican' onPress={callUser} />
			)}
			{ actionState === 'ABLE_TO_HANGUP' && <Button style={styles.call} title='Hangup' onPress={hangup} />}
			{ actionState === 'ALERTING' && <Button style={styles.call} title='Answer' onPress={answer}/>}
			{ actionState === 'ALERTING' && <Button style={styles.call} title='Reject' onPress={reject}/>}
		</View>
	)
}
export default compose(
	connect(({ vox, call, profile }) => ({ vox, call, profile }) , {callRequest, callAnswer, callReject, callHangupRequest }),
	withHandlers({
		callUser: ({ callRequest }) => () => callRequest('alican'),
		hangup: ({ callHangupRequest }) => () => callHangupRequest(),
		answer: ({ callAnswer }) => () => callAnswer(),
		reject: ({ callReject }) => () => callReject()
	})
)(Contacts)
	
const styles = StyleSheet.create({
	container: {

	},
	clientInfo: {
		padding: 10,
	},
	call: {
		margin: 10
	}
})