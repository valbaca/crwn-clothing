import { collection, getDocs } from "firebase/firestore"
import { all, call, put, takeLatest } from "redux-saga/effects"
import {
  convertCollectionsSnapshotToMap,
  firestore
} from "../../firebase/firebase.utils"
import { fetchCollectionFailure, fetchCollectionsSuccess } from "./shop-actions"
import ShopActionTypes from "./shop-types"

function* fetchCollectionsAsync() {
  try {
    const collectionRef = collection(firestore, "collections")
    const snapshot = yield getDocs(collectionRef)
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    yield put(fetchCollectionFailure(error.message))
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)])
}
