import { compose, assoc, pick } from 'ramda'
import { types } from '../actions'

const initialState = {
	call 					: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.VOX_INCOMING_CALL: {
			const callId = action.payload.handlerArgs.IncomingCall.call.callId
			const currentCallId = Boolean(state.call) ? state.call.callId : false

			if(currentCallId && (callId !== currentCallId))
				return state

			const call = { callId, state: 'ALERTING' }
			return {...state, call}
		}

		case types.CALL_ANSWER: {
			return state
		}
		case types.CALL_REQUEST: {
			return state
		}
		case types.CALL_FULFILLED: {
			const call = {
				callId: action.payload.call.callId,
				state: 'PROGRESSING'
			}
			return {...state, call}
		}
		case types.CALL_EVENT: {
			const { name, call } = action.payload.event

			if(Boolean(state.call) && (state.call.callId !== call.callId))
				return state

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

			return {...state, call: callNew}
		}

		default:
			return state
	}
}

export default reducer