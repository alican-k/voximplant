import { compose, assoc, pick } from 'ramda'
import { types } from '../actions'

const initialState = {
	voxState		: 'DISCONNECTED',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.VOX_CONNECTION_ESTABLISHED: {
			return {...state, voxState: 'ESTABLISHED'}			
		} case types.VOX_CONNECTION_FAILED: {
			return {...state, voxState: 'FAILED'}			
		} case types.VOX_CONNECTION_CLOSED: {
			return {...state, voxState: 'CLOSED'}			
		}
		case types.VOX_AUTH_RESULT: {
			const {result} = action.payload.handlerArgs.AuthResult
			return {...state, voxState: result ? 'LOGGED_IN' : 'LOGIN_FAILED'}
		}
		default:
			return state
	}
}

export default reducer