import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import contacts from './contacts'
import call from './call'

export default function(state = {}, action) {
	return {
		auth		: auth(state.auth, action, state),
		profile		: profile(state.profile, action, state),
		contacts	: contacts(state.contacts, action, state),
		call		: call(state.call, action, state),
	}
}

// export default combineReducers({
// 	auth,
// 	profile,
// 	contacts,
// 	call
// })
