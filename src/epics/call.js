import { Observable } from 'rxjs/Observable'
import { Voximplant } from 'react-native-voximplant'
import { types, actions } from '../actions'
import CallManager from '../helpers/callManager'

const { concat, of, empty, merge, fromPromise, timer } = Observable

const voxClient = Voximplant.getInstance()

export const callRequestEpic$ = (action$, store) => action$.ofType(types.CALL_REQUEST)
	.switchMap(action => voxClient.call(action.payload.userName, false, store.getState().profile.vox_displayName))
	.do(call => console.log('call: ', call))
	.switchMap(call => concat(
		of(actions.callFulFilled(call))
			.do(() => CallManager.setCall(call)),
		of(actions.routeNavigate('Outgoing')),
		voxCallEvents$(call)
	))


export const callHangupRequestEpic$ = (action$, store) => action$.ofType(types.CALL_HANGUP_REQUEST)
	.do(() => {
		const call = CallManager.getCall()
		console.log('hanging up : ', call)
		if(call) call.hangup()
	})
	.ignoreElements()

export const callEventEpic$ = (action$, store) => action$.ofType(types.CALL_EVENT)
	.do(action => {
		const { name } = action.payload.event
		if(name === 'Disconnected') {
			CallManager.setCall(null)
		} 
		if(name === 'ProgressToneStart') {
			CallManager.playOutgoing()
		}
		if(name === 'Disconnected' || name === 'Failed' || name === 'ProgressToneStop' || name === 'Connected') {
			CallManager.killOutgoing()
			CallManager.killIncoming()
		}
	})
	.switchMap(action => {
		const { name } = action.payload.event
		return name === 'Disconnected' || name === 'Failed'
			? of(actions.routeBack())
			: empty()
	})


const conversationStart$ = action$ => 
	action$.filter(action => 
		action.type === types.CALL_EVENT && action.payload.event.name === 'Connected'
	)
const conversationEnd$ = action$ => 
	action$.filter(action => 
		action.type === types.CALL_EVENT && (action.payload.event.name === 'Disconnected' || action.payload.event.name === 'Failed')
	)

export const secondElapsedEpic = (action$, store) => conversationStart$(action$)
	.switchMap(() => timer(0, 1000).takeUntil(conversationEnd$(action$)))
	.map(actions.secondElapsed)

export const incomingCallEpic$ = (action$, store) => action$.ofType(types.VOX_INCOMING_CALL)
	.mergeMap(action => {
		const currentCall = store.getState().call.call
		const incomingCall = action.payload.handlerArgs.IncomingCall.call
		if(Boolean(currentCall) && currentCall.callId !== incomingCall.callId) {
			incomingCall.decline()
			return empty()
		} else {
			CallManager.setCall(incomingCall)
			CallManager.playIncoming()
			return concat(
				of(actions.routeNavigate('Incoming')),
				voxCallEvents$(CallManager.getCall())
			)
		}
	})

export const callAnswerEpic$ = (action$, store) => action$.ofType(types.CALL_ANSWER)
	.do(() => CallManager.getCall().answer())
	.ignoreElements()

export const callRejectEpic$ = (action$, store) => action$.ofType(types.CALL_REJECT)
	.map(() => actions.routeBack())
	.do(() => CallManager.getCall().decline())
	

const voxCallEvents$ = (call) => Observable.create(observer => {
	const handler = (event) => {
		observer.next(actions.callEvent(event))
	}

	call.on(Voximplant.CallEvents.MessageReceived, handler)
	call.on(Voximplant.CallEvents.Connected, handler)
	call.on(Voximplant.CallEvents.Failed, handler)
	call.on(Voximplant.CallEvents.ICECompleted, handler)
	call.on(Voximplant.CallEvents.ICETimeout, handler)
	call.on(Voximplant.CallEvents.InfoReceived, handler)
	call.on(Voximplant.CallEvents.Disconnected, handler)
	call.on(Voximplant.CallEvents.ProgressToneStart, handler)
	call.on(Voximplant.CallEvents.ProgressToneStop, handler)
	call.on(Voximplant.CallEvents.RTCStatsReceived, (event) => { /* stat izlemiyoruz. */ })
	call.on(Voximplant.CallEvents.TransferComplete, handler)
	call.on(Voximplant.CallEvents.TransferFailed, handler)
	call.on(Voximplant.CallEvents.Updated, handler)
})	