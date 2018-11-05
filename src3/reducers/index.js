import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import vox from './vox'
import call from './call'

export default combineReducers({
	auth,
	profile,
	vox,
	call
})
