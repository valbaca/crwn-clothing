import React, { lazy, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useLocation } from "react-router-dom"
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

const ShopPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCollectionsStart())
  }, [dispatch])

  // :categoryId means it's assigned to a path variable
  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path={""} element={<CollectionsOverviewContainer />} />
          <Route path={":collectionId"} element={<CollectionPageContainer />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default ShopPage
