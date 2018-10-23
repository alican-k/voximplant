import { compose, isNil, prop, propEq } from 'ramda'
import { altState } from './utils'

const voxClientState			= prop('voxClientState')
const displayName				= prop('displayName')
const isLoggedIn				= propEq('voxClientState', 'LOGGED_IN')
const isClosed					= propEq('voxClientState', 'CLOSED')
const call						= prop('call')
const totalCallState			= prop('totalCallState')
const actionState				= compose(
	call => {
		if(isNil(call)) return 'NONE'
		else if(call.state === 'ALERTING') return 'ALERTING'
		else return 'ABLE_TO_HANGUP'
	}, 
	call
)
export const main = altState('main', {voxClientState, displayName, isLoggedIn, isClosed, call, totalCallState, actionState})