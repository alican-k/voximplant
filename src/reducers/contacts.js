import { types, actions } from '../actions'
import { filter } from 'ramda'

const initialState = {
	status		: 'LOADING',       	// LOADED
	list		: [],
}

const reducer = (state = initialState, action, root) => {
	switch (action.type) {
		case types.CONTACTS_FETCHED: {
			const list = filter(item => item.id !== root.auth.uid)(action.payload.list)
			return {...state, list, status: 'LOADED'}
		}

		default:
			return state;
	}
}

export default reducer
