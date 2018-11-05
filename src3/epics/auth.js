import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { types, actions } from '../actions'
import firebase from 'react-native-firebase'
import fir from '../helpers/firebase'

const { empty, fromPromise, of } = Observable

export const authStateEpic = action$ => action$.ofType(types.STARTUP)
	.switchMap(() => fir.authState$)
	.map(user => user ? actions.loggedIn(user) : actions.notLoggedIn())

export const logInEpic = action$ => action$.ofType(types.LOG_IN)
	.switchMap(action => !Boolean(action.payload.email) || !Boolean(action.payload.password)
		? of(actions.authError(emptyStringError))
		: fromPromise(fir.logIn(action.payload.email, action.payload.password))
			.ignoreElements()
			.catch(err => of(actions.authError(err)))
	)

export const logOutEpic = action$ => action$.ofType(types.LOG_OUT)
	.switchMap(action => fir.logOut())
	.mapTo(actions.routeReset('Auth'))

export const closeAuthErrorEpic = action$ => action$.ofType('AUTH_ERROR')
	.delay(2000)
	.mapTo(actions.closeAuthError())

const emptyStringError = {
	message: 'Please provide email and password'
}