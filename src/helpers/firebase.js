import 'rxjs'
import { Observable } from 'rxjs/Observable'
import firebase from 'react-native-firebase'

export const getUid = () => firebase.auth().currentUser.uid

export const authState$ = Observable.create(observer => {
	firebase.auth().onAuthStateChanged(user => {
		if(user) {
			user.getIdToken(true)
				.then(token => observer.next(user))
				.catch(error => observer.next(null))
		}
		else {
			observer.next(user)
		}
	})
})

export const signUp = (email, password) => 
	firebase.auth().createUserWithEmailAndPassword(email, password)

export const logOut = () => 
	firebase.auth().signOut()

export const logIn = (email, password) => 
	firebase.auth().signInWithEmailAndPassword(email, password)

export const sendResetEmail = (email) => 
	firebase.auth().sendPasswordResetEmail(email)

/* * * * * * * */

const db = firebase.firestore()
export const profileRef = () => firebase.firestore().doc(`Vox/db/Profiles/${getUid()}`)

export const fromDocRef$ = ref => Observable.create(observer => {
	const unsubscribe = ref.onSnapshot(doc => {
		observer.next({id: doc.id, data: doc.data()})
	})

	return () => {
		unsubscribe()
	}
})


export default {
	getUid,
	authState$,
	signUp, logOut, logIn, sendResetEmail,
}