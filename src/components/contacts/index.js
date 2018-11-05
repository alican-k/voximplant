import React from 'react'
import { TouchableOpacity, StyleSheet, ImageBackground, Text, View, StatusBar, Platform, NativeModules } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import background from '../../assets/images/Background.png'
import ContactList from './ContactsList'
import { logOut } from '../../actions'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT
	
const ContactsIndex = ({ list, status, logOut }) =>
	<ImageBackground 
		style={styles.background}
		source={background}>

		<StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
		
		<View style={styles.header}>
			<Text style={styles.headerTitle}>Contacts</Text>
		</View>
		
		<View style={styles.body}>
			<ContactList 
				status={status}
				list={list} />

			<TouchableOpacity onPress={() => logOut()} style={styles.logOut}>
				<Text style={styles.logOutText}>Log out</Text>
			</TouchableOpacity>
		</View>
	</ImageBackground>
	
export default compose(
	connect(
		({ contacts }) => ({ 
			list	: contacts.list,
			status	: contacts.status
		}), 
		{ logOut }
	),
)(ContactsIndex)
	
const styles = StyleSheet.create({
	background: {
		display: 'flex',
		flex: 1,
	},
	header: {
		padding: 25,
		marginTop: STATUSBAR_HEIGHT
	},
	headerTitle: {
		color: 'white',
		fontSize: 20,
	},
	body: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopRightRadius: 8,
		borderTopLeftRadius: 8
	},
	logOut: {
		margin: 20,
		padding: 8,
		backgroundColor: 'blue',
		borderRadius: 8,
	},
	logOutText: {
		color: 'white',
	}
})





// import React from 'react'
// import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
// import { connect } from 'react-redux'
// import { compose, withHandlers } from 'recompose'
// import { callRequest, callHangupRequest, callAnswer, callReject } from '../../actions'

// const Contacts = ({ profile, call, callUser, hangup, answer, reject }) => {
// 	let actionState = 'ABLE_TO_HANGUP'
// 	if(!Boolean(call.call)) actionState = 'NONE'
// 	else if(call.call.state === 'ALERTING') actionState = 'ALERTING'

// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.clientInfo}>
// 				<Text>Client State: {profile.voxState}</Text>
// 				{ profile.voxState === 'LOGGED_IN' && <Text>Vox display name: {profile.vox_displayName}</Text>}
// 			</View>
			
// 			{ profile.voxState === 'LOGGED_IN' && actionState === 'NONE' && (
// 				<Button style={styles.call} title='Click to call Alican' onPress={callUser} />
// 			)}
// 			{ actionState === 'ABLE_TO_HANGUP' && <Button style={styles.call} title='Hangup' onPress={hangup} />}
// 			{ actionState === 'ALERTING' && <Button style={styles.call} title='Answer' onPress={answer}/>}
// 			{ actionState === 'ALERTING' && <Button style={styles.call} title='Reject' onPress={reject}/>}
// 		</View>
// 	)
// }
// export default compose(
// 	connect(({ call, profile }) => ({ call, profile }) , {callRequest, callAnswer, callReject, callHangupRequest }),
// 	withHandlers({
// 		callUser: ({ callRequest }) => () => callRequest('alican'),
// 		hangup: ({ callHangupRequest }) => () => callHangupRequest(),
// 		answer: ({ callAnswer }) => () => callAnswer(),
// 		reject: ({ callReject }) => () => callReject()
// 	})
// )(Contacts)
	
// const styles = StyleSheet.create({
// 	container: {

// 	},
// 	clientInfo: {
// 		padding: 10,
// 	},
// 	call: {
// 		margin: 10
// 	}
// })