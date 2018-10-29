import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { types, actions } from '../actions'
import fir from '../helpers/firebase'

const { fromPromise, of } = Observable

export const authStateEpic = action$ => action$.ofType(types.STARTUP)
	.switchMap(() => fir.authState$)
	.map(user => user ? actions.loggedIn(user) : actions.notLoggedIn())

// export const loggedInEpic = action$ => action$.ofType(types.LOGGED_IN)
// 	.mapTo(actions.routeReset('Tabs'))

export const signUpEpic = action$ => action$.ofType(types.SIGN_UP)
	.switchMap(action => 
		fromPromise(fir.signUp(action.payload.email, action.payload.password))
			.ignoreElements()
			.catch(err => of(authError(err)))
	)

export const logOutEpic = action$ => action$.ofType(types.LOG_OUT)
	.switchMap(action => fir.logOut())
	.mapTo(actions.routeReset('Auth'))

export const logInEpic = action$ => action$.ofType(types.LOG_IN)
	.switchMap(action => 
		fromPromise(fir.logIn(action.payload.email, action.payload.password))
			.ignoreElements()
			.catch(err => Observable.of(actions.authError(err)))
	)

export const sendResetEmailEpic = action$ => action$.ofType(types.SEND_RESET_EMAIL)
	.switchMap(action => 
		fromPromise(fir.sendResetEmail(action.payload))
			.mapTo(actions.routeReset('ResetEmailSent'))
			.catch(err => Observable.of(actions.authError(err)))
	)

export const closeAuthErrorEpic = action$ => action$.ofType('AUTH_ERROR')
	.delay(2000)
	.do(() => console.log('delay sonrası'))
	.mapTo(actions.closeAuthError())
