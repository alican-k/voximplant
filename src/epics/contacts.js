import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { types, actions } from '../actions'
import { fromCollectionRef$, profilesRef } from '../helpers/firebase'

export const contactsEpic = (action$, store) => action$.ofType(types.PROFILE_IS_SET)
	.switchMap(() => fromCollectionRef$(profilesRef()))
	.map(actions.contactsFetched)