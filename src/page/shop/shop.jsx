import React from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import CollectionsOverview from "../../components/collections-overview/collections-overview.jsx"
import {
  convertCollectionsSnapshotToMap,
  firestore
} from "../../firebase/firebase.utils.js"
import { updateCollections } from "../../redux/shop/shop-actions.js"
import CollectionPage from "../collection/collection.jsx"
class ShopPage extends React.Component {
  unsubscribeFromSnapshop = null

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection("collections")
    this.unsubscribeFromSnapshop = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        updateCollections(collectionsMap)
      }
    )
  }

  render() {
    const { match } = this.props
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        {/* :categoryId means it's assigned to a path variable */}
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
