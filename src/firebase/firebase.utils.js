import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDnq4nU1J8Oi_7cIk4VV6LBs0GbPslE1TI',
  authDomain: 'crwn-db-ee722.firebaseapp.com',
  projectId: 'crwn-db-ee722',
  storageBucket: 'crwn-db-ee722.appspot.com',
  messagingSenderId: '1068983394645',
  appId: '1:1068983394645:web:9dd3ea0a9d21445c114fdc',
  measurementId: 'G-BKZJ1LZC5C'
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase