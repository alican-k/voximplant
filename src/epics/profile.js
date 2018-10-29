import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { replace } from 'ramda'
import { types, actions } from '../actions'
import { fromDocRef$, profileRef } from '../helpers/firebase'

const { fromPromise, merge, of } = Observable

export const loggedInEpic = action$ => action$.ofType(types.LOGGED_IN)
	.switchMap(action => {
		const obs1$ = fromDocRef$(profileRef())
		const obs2$ = obs1$.take(1)
		return merge(
			obs1$.map(actions.profileChanged),
			obs2$.map(profile => actions.routeReset(profile.data ? 'Tabs' : 'Onboarding'))
		)		
	})

export const submitOnboardingEpic = (action$, store) => action$.ofType(types.SUBMIT_ONBOARDING)
	.switchMap(action => addUserRequestUrl(action.payload.name, store.getState().auth.user))
	.switchMap(voxResponse => voxResponse.error ? empty() : of(voxResponse))
	.switchMap(res => profileRef().set(res))
	.map(() => actions.routeReset('Tabs'))

const addUserRequestUrl = (name, user) => {
	const details = {
		account_id: '2526888',
		api_key: '52568c3d-fc42-4480-bd63-e26f364d5e0f',
		cmd: 'AddUser',
		user_name: replace('@', '__at__', user.email),
		user_password: '000000',
		user_display_name: name,
		user_custom_data: 'customdatablabla',
		application_name: 'talentenvoyapp.talentenvoy.voximplant.com'
	}
	let formBody = [];
	for (const property in details) {
	  const encodedKey = encodeURIComponent(property)
	  const encodedValue = encodeURIComponent(details[property])
	  formBody.push(encodedKey + "=" + encodedValue)
	}
	formBody = formBody.join("&")
	
	return fetch('https://api.voximplant.com/platform_api', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody
		})
		.then(response => response.json())
		.then(json => {
			if(json.error){
				console.log('Error while add user to VOXIMPLANT: ', json.error)
				return json
			}
			return {
				name: name, 
				vox_id: json.id, 
				vox_displayName: details.user_display_name, 
				vox_userName: details.user_name, 
				vox_password: details.user_password
			}
		})
}

// https://api.voximplant.com/platform_api?
// cmd=AddUser&account_id=2526888&api_key=52568c3d-fc42-4480-bd63-e26f364d5e0f
// &user_name=ali&user_password=000000&user_display_name=ali&mobile_phone=+905555586155&user_custom_data=mobiledeveloper&application_name=talentenvoyapp.talentenvoy.voximplant.com