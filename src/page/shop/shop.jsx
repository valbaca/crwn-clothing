import React from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import CollectionsOverview from "../../components/collections-overview/collections-overview.jsx"
import WithSpinner from "../../components/with-spinner/with-spinner.jsx"
import {
  convertCollectionsSnapshotToMap,
  firestore
} from "../../firebase/firebase.utils.js"
import { updateCollections } from "../../redux/shop/shop-actions.js"
import CollectionPage from "../collection/collection.jsx"

const CollectionOverViewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {
  state = {
    loading: true
  }
  unsubscribeFromSnapshop = null

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection("collections")

    this.unsubscribeFromSnapshop = collectionRef.onSnapshot((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      this.setState({ loading: false })
    })

    /* This style uses Promise-style, instead of the streaming/observable pattern */
    // collectionRef.get().then((snapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({ loading: false })
    // })
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshop?.()
  }

  render() {
    const { match } = this.props
    const { loading } = this.state
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverViewWithSpinner isLoading={loading} {...props} />
          )}
        />
        {/* :categoryId means it's assigned to a path variable */}
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
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
