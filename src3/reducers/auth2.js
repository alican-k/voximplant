import { pick } from 'ramda'

const initialState = {
	authStatus: 'LOGGING_IN',       // LOGGED_IN, NOT_LOGGED_IN, ERROR
	user: null,
	errorMessage: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case 'LOGGED_IN':
			const user = pick(['uid', 'email'])(action.payload.user)
			return { ...state, authStatus: 'LOGGED_IN', user }

		case 'NOT_LOGGED_IN':
			return {...state, authStatus: 'NOT_LOGGED_IN', uid: null}

		case 'LOGGING_IN':
			return { ...state, authState: 'LOGGING_IN' }

		case 'AUTH_ERROR':
			return { ...state, errorMessage: action.payload.userInfo.NSLocalizedDescription }

		case 'CLOSE_AUTH_ERROR': 
			return { ...state, errorMessage: '' }

		default:
		return state;
	}
}

export default reducer
