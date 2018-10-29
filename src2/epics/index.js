import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import { startup } from '../actions'
import { 
	initialEpic$, callUserRequestEpic$, incomingCallEpic$, authResultEpic$,
	 callHangupRequestEpic$, callAnswerEpic$, callEventEpic$,
	 disconnectEpic$, loginAsEpic$,
	 displayLocalNotificationEpic$
} from './main'

const startupEpic = () => Observable.of(startup()).delay(50)

export default combineEpics(
	startupEpic,
	initialEpic$, callUserRequestEpic$, incomingCallEpic$, authResultEpic$,
	callHangupRequestEpic$, callEventEpic$, callAnswerEpic$,
	disconnectEpic$, loginAsEpic$,
	displayLocalNotificationEpic$
)