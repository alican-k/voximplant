import { NavigationActions, StackActions } from 'react-navigation'

// similar to the this :
// https://github.com/react-community/react-navigation/issues/1439

let _navigation

export const setNavigation = navigation => { _navigation = navigation }

export const navigate = (routeName, params = {}) => {
	_navigation.dispatch(
		NavigationActions.navigate({
			type: 'Navigation/NAVIGATE',
			routeName,
			params,
		}),
	)
}

export const reset = (routeName, params = {}) => {
	_navigation.dispatch(
		StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					type: 'Navigation/NAVIGATE',
					routeName,
					params,
				}),
			],
			key: null
		}),
	)
}
  
export const back = (routeName = null) => {
	const config = routeName ? {key: routeName} : {}
	_navigation.dispatch(
		NavigationActions.back(config),
	)
}