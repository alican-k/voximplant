import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { types } from '../actions'
import { reset, navigate, back } from '../helpers/navigator'

export const navigateEpic = action$ => action$.ofType(types.ROUTE_NAVIGATE)
	.do(action => {
		const { routeName, params } = action.payload
		return navigate(routeName, params)
	})
	.ignoreElements()

export const resetEpic = action$ => action$.ofType(types.ROUTE_RESET)
	.do(action => {
		return reset(action.payload.routeName, action.payload.params)
	})
	.ignoreElements()

export const backEpic = action$ => action$.ofType(types.ROUTE_BACK)
	.do(action => back(action.payload.routeName))
	.ignoreElements()

