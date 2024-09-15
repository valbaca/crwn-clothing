import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  writeBatch
} from "firebase/firestore"

const config = {
  apiKey: "AIzaSyDnq4nU1J8Oi_7cIk4VV6LBs0GbPslE1TI",
  authDomain: "crwn-db-ee722.firebaseapp.com",
  projectId: "crwn-db-ee722",
  storageBucket: "crwn-db-ee722.appspot.com",
  messagingSenderId: "1068983394645",
  appId: "1:1068983394645:web:9dd3ea0a9d21445c114fdc",
  measurementId: "G-BKZJ1LZC5C"
}

export const firebaseApp = initializeApp(config)
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = doc(firestore, `users/${userAuth.uid}`)
  const snapShot = await getDoc(userRef)
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error("error creating user", error.message)
    }
  }
  return userRef
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey)

  const batch = writeBatch(firestore)

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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject
    )
  })
}
