import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import { startup } from '../actions'
import { navigateEpic, resetEpic, backEpic } from './navigation'
//import { authStateEpic, signUpEpic, logOutEpic, logInEpic, sendResetEmailEpic, closeAuthErrorEpic } from './auth'
import { authStateEpic, logInEpic, logOutEpic, closeAuthErrorEpic } from './auth'
import { loggedInEpic, submitOnboardingEpic } from './profile'
import { voxClientStateEpic$, authResultEpic$ } from './vox'
import { callRequestEpic$, callHangupRequestEpic$, callEventEpic$, callAnswerEpic$, callRejectEpic$, incomingCallEpic$ } from './call'

const startupEpic = action$ => Observable.of(startup()).delay(500)

export default combineEpics(
	startupEpic,
	navigateEpic, resetEpic, backEpic,
	//authStateEpic, signUpEpic, logOutEpic, logInEpic, sendResetEmailEpic, closeAuthErrorEpic,
	authStateEpic, logInEpic, logOutEpic, closeAuthErrorEpic,
	loggedInEpic, submitOnboardingEpic,
	voxClientStateEpic$, authResultEpic$,
	callRequestEpic$, callHangupRequestEpic$, callEventEpic$, callAnswerEpic$, callRejectEpic$, incomingCallEpic$
)