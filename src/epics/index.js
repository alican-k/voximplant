import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import { startup } from '../actions'
import { navigateEpic, resetEpic, backEpic } from './navigation'
import { authStateEpic, signupEpic, logInEpic, logOutEpic, closeAuthErrorEpic } from './auth'
import { loggedInEpic, profileIsNotSetEpic, profileIsSetEpic, authResultEpic } from './profile'
import { contactsEpic } from './contacts'
import { callRequestEpic$, callHangupRequestEpic$, callEventEpic$, callAnswerEpic$, callRejectEpic$, incomingCallEpic$,
	secondElapsedEpic } from './call'

const startupEpic = action$ => Observable.of(startup()).delay(500)

export default combineEpics(
	startupEpic,
	navigateEpic, resetEpic, backEpic,
	authStateEpic, signupEpic, logInEpic, logOutEpic, closeAuthErrorEpic,
	loggedInEpic, profileIsNotSetEpic, authResultEpic, profileIsSetEpic,
	contactsEpic,
	callRequestEpic$, callHangupRequestEpic$, callEventEpic$, callAnswerEpic$, callRejectEpic$, incomingCallEpic$,
	secondElapsedEpic
)