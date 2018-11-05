import { types } from '../actions'

const initialState = {
	status			: 'LOADING',				// LOADED, şimdilik kullanıldığı bir yer de yok aslında
	vox_id			: null,
	vox_displayName : null,
	vox_userName	: null,
	vox_password	: null,
	voxState		: 'DISCONNECTED',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PROFILE_IS_SET: {
			const { profile } = action.payload
			return {...state, ...profile, status: 'LOADED'}
		}

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