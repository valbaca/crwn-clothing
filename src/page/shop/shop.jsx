import React, { lazy, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route } from "react-router-dom"
import Spinner from "../../components/spinner/spinner.jsx"
import { fetchCollectionsStart } from "../../redux/shop/shop-actions.js"

const CollectionsOverviewContainer = lazy(() =>
  import(
    "../../components/collections-overview/collections-overview-container.jsx"
  )
)
const CollectionPageContainer = lazy(() =>
  import("../collection/collection-container.jsx")
)

const ShopPage = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCollectionsStart())
  }, [dispatch])

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
    </div>
  )
}

export default ShopPage
