import { compose, assoc, pick } from 'ramda'
import { types } from '../actions'

const initialState = {
	voxClientState			: 'DISCONNECTED',
	displayName				: null,
	call 					: null,
	totalCallState			: 'NONE'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.VOX_EVENTS_CONNECTION_ESTABLISHED: {
			return {...state, voxClientState: 'ESTABLISHED'}			
		} case types.VOX_EVENTS_CONNECTION_FAILED: {
			return {...state, voxClientState: 'FAILED'}			
		} case types.VOX_EVENTS_CONNECTION_CLOSED: {
			return {...state, voxClientState: 'CLOSED'}			
		}
		case types.VOX_EVENTS_AUTH_RESULT: {
			const {result, displayName} = action.payload.handlerArgs.AuthResult
			return {...state, displayName, voxClientState: result ? 'LOGGED_IN' : 'LOGIN_FAILED'}
		}
		case types.VOX_EVENTS_INCOMING_CALL: {
			const call = compose(
				assoc('state', 'ALERTING'),
				pick(['callId'])
			)(action.payload.handlerArgs.IncomingCall.call)
			const totalCallState = state.totalCallState + '--' + call.state 
			return {...state, call, totalCallState}
		}

		case types.CALL_ANSWER: {
			const totalCallState = state.totalCallState + '--' + 'ANSWER' 
			return {...state, totalCallState}
		}
		case types.CALL_USER_REQUEST: {
			const totalCallState = state.totalCallState + '--' + 'REQUESTED' 
			return {...state, totalCallState}
		}
		case types.CALL_USER_FULFILLED: {
			console.log('line 43')
			const call = pick(['callId'])(action.payload.call)
			call.state = 'PROGRESSING'
			console.log('line 45')
			const totalCallState = state.totalCallState + '--' + call.state 
			return {...state, call, totalCallState}
		}
		case types.CALL_EVENT: {
			const { name, call } = action.payload.event
			const totalCallState = state.totalCallState + '--' + name 
			let callNew = null
			if(name === 'Disconnected')
				callNew = null
			else if (name === 'Failed'){
				console.log('call failed')
				callNew = null
			}
			else if (name === 'Connected')
				callNew = { callId: call.callId, state: 'CONNECTED' }
			else {
				callNew = state.call
			}

			// const callNew = name === 'Disconnected' ? null : call
			return {...state, call: callNew, totalCallState}
		}

		default:
			return state
	}
}

export default reducer
