import { types, actions } from '../actions'
import { pick } from 'ramda'

const initialState = {
	status	: 'LOGGING_IN',       	// LOGGED_IN, NOT_LOGGED_IN,
	page	: 'LOADING',			// LOG_IN, SIGN_UP
	email: null,
	uid: null,
	name: null,
	errorMessage: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.CHANGE_PAGE: {
			const { page } = action.payload
			return {...state, page}
		}
		case types.SIGN_UP: {
			const { name } = action.payload
			return {...state, name}
		}
		case 'LOGGED_IN':
			const { email, uid } = pick(['uid', 'email'])(action.payload.user)
			return { ...state, status: 'LOGGED_IN', uid, email }

		case 'NOT_LOGGED_IN': {
			return {...state, status: 'NOT_LOGGED_IN', page: 'LOG_IN', uid: null, email: null }
		}
		case 'LOGGING_IN':
			return { ...state, authState: 'LOGGING_IN' }

		case 'AUTH_ERROR':	//action.payload.userInfo.NSLocalizedDescription
			const errorMessage = action.payload.err.code || action.payload.err.message
			return { ...state, errorMessage }

		case 'CLOSE_AUTH_ERROR': 
			return { ...state, errorMessage: '' }

		default:
			return state;
	}
}

export default reducer
