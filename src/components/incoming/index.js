import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Incoming from './Incoming'
import Accepted from './Accepted'

const IncomingIndex = ({ call }) => {
	if(call.call && call.call.state === 'ALERTING')
		return <Incoming />
	else if(call.call && call.call.state === 'CONNECTED')
		return <Accepted />
	else return <Accepted />
}
	
export default compose(
	connect(({ call }) => ({ call }), null),
)(IncomingIndex)
	
