const ac = (type, payload) => ({type, payload})

export const types = {
	STARTUP				: 'STARTUP',
	
	LOGGED_IN			: 'LOGGED_IN',
	LOGGING_IN			: 'LOGGING_IN',
	NOT_LOGGED_IN		: 'NOT_LOGGED_IN',
	SIGN_UP				: 'SIGN_UP',
	//SIGNED_UP			: 'SIGNED_UP',
	LOG_OUT				: 'LOG_OUT',
	LOG_IN				: 'LOG_IN',
	SEND_RESET_EMAIL	: 'SEND_RESET_EMAIL',
	AUTH_ERROR			: 'AUTH_ERROR',
	CLOSE_AUTH_ERROR	: 'CLOSE_AUTH_ERROR',

	ROUTE_NAVIGATE		: 'ROUTE_NAVIGATE',
	ROUTE_RESET			: 'ROUTE_RESET',
	ROUTE_BACK			: 'ROUTE_BACK',

	PROFILE_CHANGED		: 'PROFILE_CHANGED',
	SUBMIT_ONBOARDING	: 'SUBMIT_ONBOARDING',

	VOX_CONNECTION_ESTABLISHED	: 'VOX_CONNECTION_ESTABLISHED',
	VOX_CONNECTION_CLOSED		: 'VOX_CONNECTION_CLOSED',
	VOX_CONNECTION_FAILED		: 'VOX_CONNECTION_FAILED',
	VOX_AUTH_RESULT				: 'VOX_AUTH_RESULT',
	VOX_INCOMING_CALL			: 'VOX_INCOMING_CALL',

	CALL_REQUEST 					: 'CALL_REQUEST',
	CALL_FULFILLED					: 'CALL_FULFILLED',
	CALL_ANSWER						: 'CALL_ANSWER',
	CALL_REJECT						: 'CALL_REJECT',
	CALL_HANGUP_REQUEST				: 'CALL_HANGUP_REQUEST',
	CALL_EVENT 						: 'CALL_EVENT',
}

export const startup = () => ({ type: 'STARTUP' })

export const loggedIn 		= (user) 					=> ac(types.LOGGED_IN,  {user} )
export const loggingIn 		= () 						=> ac(types.LOGGING_IN )
export const notLoggedIn 	= () 						=> ac(types.NOT_LOGGED_IN )
export const signUp 		= (email, password) 		=> ac(types.SIGN_UP,  {email, password} )
//export const signedUp 		= (name) 					=> ac(types.SIGNED_UP,  {name} )
export const logOut 		= () 						=> ac(types.LOG_OUT)
export const logIn 			= (email, password) 		=> ac(types.LOG_IN,  {email, password} )
export const sendResetEmail = (email) 					=> ac(types.SEND_RESET_EMAIL,  {email} )
export const authError 		= (err) 					=> ac(types.AUTH_ERROR, {err} )
export const closeAuthError = () 						=> ac(types.CLOSE_AUTH_ERROR )

export const routeNavigate 	= (routeName, params = {}) 	=> ac(types.ROUTE_NAVIGATE,  {routeName, params})
export const routeReset 	= (routeName, params = {}) 	=> ac(types.ROUTE_RESET,  {routeName, params})
export const routeBack 		= (routeName) 				=> ac(types.ROUTE_BACK,  {routeName})

export const profileChanged		= (profile) 				=> ac(types.PROFILE_CHANGED, { profile })
export const submitOnboarding	= (name)					=> ac(types.SUBMIT_ONBOARDING, { name })

export const voxConnectionEstablished	= (handlerArgs)		=> ac(types.VOX_CONNECTION_ESTABLISHED, { handlerArgs })
export const voxConnectionClosed		= (handlerArgs)		=> ac(types.VOX_CONNECTION_CLOSED, { handlerArgs })
export const voxConnectionFailed		= (handlerArgs)		=> ac(types.VOX_CONNECTION_FAILED, { handlerArgs })
export const voxAuthResult				= (handlerArgs)		=> ac(types.VOX_AUTH_RESULT, { handlerArgs })
export const voxIncomingCall			= (handlerArgs)		=> ac(types.VOX_INCOMING_CALL, { handlerArgs })

export const callRequest 				= (userName)		=> ac(types.CALL_REQUEST, { userName })
export const callFulFilled				= (call)			=> ac(types.CALL_FULFILLED, { call })
export const callEvent					= (event)			=> ac(types.CALL_EVENT, { event })
export const callAnswer					= () 				=> ac(types.CALL_ANSWER)
export const callReject					= () 				=> ac(types.CALL_REJECT)
export const callHangupRequest			= ()				=> ac(types.CALL_HANGUP_REQUEST)

export const actions = {
	startup,
	loggedIn, loggingIn, notLoggedIn, signUp, logOut, logIn, sendResetEmail, authError, closeAuthError, 
	routeNavigate, routeReset, routeBack,
	profileChanged, submitOnboarding,
	voxConnectionEstablished, voxConnectionClosed, voxConnectionFailed, voxAuthResult, voxIncomingCall,
	callRequest, callFulFilled, callEvent, callAnswer, callReject, callHangupRequest
}