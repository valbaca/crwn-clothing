import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route } from "react-router-dom"
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview-container.jsx"
import { fetchCollectionsStart } from "../../redux/shop/shop-actions.js"
import CollectionPageContainer from "../collection/collection-container.jsx"

const ShopPage = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCollectionsStart())
  }, [dispatch])

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      {/* :categoryId means it's assigned to a path variable */}
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  )
}

export default ShopPage
