import { pick } from 'ramda'

const initialState = {
	status	: 'LOGGING_IN',       	// LOGGED_IN, NOT_LOGGED_IN,
	page	: 'LOADING',			// LOG_IN
	user: null,
	errorMessage: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case 'LOGGED_IN':
			const user = pick(['uid', 'email'])(action.payload.user)
			return { ...state, status: 'LOGGED_IN', user }

		case 'NOT_LOGGED_IN':
			return {...state, status: 'NOT_LOGGED_IN', page: 'LOG_IN', user: null}

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
