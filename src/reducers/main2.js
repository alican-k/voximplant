import { types } from '../actions'

const initialState = {
	voxClientState				: 'DISCONNECTED',
	displayName					: null
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
			return state
		}

		default:
			return state
	}
}

export default reducer
