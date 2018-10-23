const ac = (type, payload) => ({type, payload})

export const types = {
	STARTUP					: 'STARTUP',

	VOX_EVENTS_CONNECTION_ESTABLISHED	: 'VOX_EVENTS_CONNECTION_ESTABLISHED',
	VOX_EVENTS_CONNECTION_CLOSED		: 'VOX_EVENTS_CONNECTION_CLOSED',
	VOX_EVENTS_CONNECTION_FAILED		: 'VOX_EVENTS_CONNECTION_FAILED',
	VOX_EVENTS_AUTH_RESULT				: 'VOX_EVENTS_AUTH_RESULT',
	VOX_EVENTS_INCOMING_CALL			: 'VOX_EVENTS_INCOMING_CALL',

	CALL_USER 							: 'CALL_USER'	
}

export const startup				= ()				=> ac(types.STARTUP)

export const voxEventsConnectionEstablished	= (handlerArgs)		=> ac(types.VOX_EVENTS_CONNECTION_ESTABLISHED, { handlerArgs })
export const voxEventsConnectionClosed		= (handlerArgs)		=> ac(types.VOX_EVENTS_CONNECTION_CLOSED, { handlerArgs })
export const voxEventsConnectionFailed		= (handlerArgs)		=> ac(types.VOX_EVENTS_CONNECTION_FAILED, { handlerArgs })
export const voxEventsAuthResult			= (handlerArgs)		=> ac(types.VOX_EVENTS_AUTH_RESULT, { handlerArgs })
export const voxEventsIncomingCall			= (handlerArgs)		=> ac(types.VOX_EVENTS_INCOMING_CALL, { handlerArgs })

export const callUser 					= (userName)		=> ac(types.CALL_USER, { userName })

export const actions = {
	startup,
	voxEventsConnectionEstablished, voxEventsConnectionClosed, voxEventsConnectionFailed, voxEventsAuthResult, voxEventsIncomingCall,
	callUser
}