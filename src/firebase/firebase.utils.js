import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyDnq4nU1J8Oi_7cIk4VV6LBs0GbPslE1TI",
  authDomain: "crwn-db-ee722.firebaseapp.com",
  projectId: "crwn-db-ee722",
  storageBucket: "crwn-db-ee722.appspot.com",
  messagingSenderId: "1068983394645",
  appId: "1:1068983394645:web:9dd3ea0a9d21445c114fdc",
  measurementId: "G-BKZJ1LZC5C"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData })
    } catch (error) {
      console.error("error creating user", error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data()
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((acc, cur) => {
    acc[cur.title.toLowerCase()] = cur
    return acc
  }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
