import { types } from '../actions'

const initialState = {
	status			: 'LOADING',				// LOADED, şimdilik kullanıldığı bir yer de yok aslında
	profile			: {},
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PROFILE_CHANGED: {
			const { profile } = action.payload
			return {...state, profile, status: 'LOADED'}
		}
		
		default:
			return state
	}
}

export default reducer