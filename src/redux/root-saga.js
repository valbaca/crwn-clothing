import { all, call } from "redux-saga/effects"
import { cartSagas } from "./cart/cart-sagas.js"
import { fetchCollectionsStart } from "./shop/shop-sagas"
import { userSagas } from "./user/user-sagas.js"

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(userSagas), call(cartSagas)])
}
