import React from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import { createStructuredSelector } from "reselect"
import CollectionsOverview from "../../components/collections-overview/collections-overview.jsx"
import WithSpinner from "../../components/with-spinner/with-spinner.jsx"
import { fetchCollectionsStartAsync } from "../../redux/shop/shop-actions.js"
import {
  isCollectionsLoaded,
  selectIsCollectionFetching
} from "../../redux/shop/shop-selectors.js"
import CollectionPage from "../collection/collection.jsx"

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStartAsync()
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
        {/* :categoryId means it's assigned to a path variable */}
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: isCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
