const ac = (type, payload) => ({type, payload})

export const types = {
	STARTUP					: 'STARTUP',

	VOX_EVENTS_CONNECTION_ESTABLISHED	: 'VOX_EVENTS_CONNECTION_ESTABLISHED',
	VOX_EVENTS_CONNECTION_CLOSED		: 'VOX_EVENTS_CONNECTION_CLOSED',
	VOX_EVENTS_CONNECTION_FAILED		: 'VOX_EVENTS_CONNECTION_FAILED',
	VOX_EVENTS_AUTH_RESULT				: 'VOX_EVENTS_AUTH_RESULT',
	VOX_EVENTS_INCOMING_CALL			: 'VOX_EVENTS_INCOMING_CALL',

	DISCONNECT							: 'DISCONNECT',
	LOGIN_AS	 						: 'LOGIN_AS',

	CALL_USER_REQUEST 					: 'CALL_USER_REQUEST',
	CALL_USER_FULFILLED					: 'CALL_USER_FULFILLED',
	CALL_ANSWER							: 'CALL_ANSWER',
	CALL_HANGUP_REQUEST					: 'CALL_HANGUP_REQUEST',
	CALL_EVENT 							: 'CALL_EVENT',
}

export const startup				= ()				=> ac(types.STARTUP)

export const voxEventsConnectionEstablished	= (handlerArgs)		=> ac(types.VOX_EVENTS_CONNECTION_ESTABLISHED, { handlerArgs })
export const voxEventsConnectionClosed		= (handlerArgs)		=> ac(types.VOX_EVENTS_CONNECTION_CLOSED, { handlerArgs })
export const voxEventsConnectionFailed		= (handlerArgs)		=> ac(types.VOX_EVENTS_CONNECTION_FAILED, { handlerArgs })
export const voxEventsAuthResult			= (handlerArgs)		=> ac(types.VOX_EVENTS_AUTH_RESULT, { handlerArgs })
export const voxEventsIncomingCall			= (handlerArgs)		=> ac(types.VOX_EVENTS_INCOMING_CALL, { handlerArgs })

export const disconnect 					= ()				=> ac(types.DISCONNECT)
export const loginAs 						= (userIndex)		=> ac(types.LOGIN_AS, { userIndex })

export const callUserRequest 				= (userName)		=> ac(types.CALL_USER_REQUEST, { userName })
export const callUserFulFilled				= (call)			=> ac(types.CALL_USER_FULFILLED, { call })
export const callEvent						= (event)			=> ac(types.CALL_EVENT, { event })
export const callAnswer						= () 				=> ac(types.CALL_ANSWER)
export const callHangupRequest				= ()				=> ac(types.CALL_HANGUP_REQUEST)

export const actions = {
	startup,
	voxEventsConnectionEstablished, voxEventsConnectionClosed, voxEventsConnectionFailed, voxEventsAuthResult, voxEventsIncomingCall,
	callUserRequest, callUserFulFilled, callAnswer, callHangupRequest, callEvent,
	disconnect, loginAs
}