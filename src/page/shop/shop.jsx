import React from 'react'
import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.jsx'
import CollectionPage from '../collection/collection.jsx'

// Automatically passed {match, location, history}
const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    {/* :categoryId means it's assigned to a path variable */}
    <Route path={`${match.path}/:categoryId`} component={CollectionPage}/>
  </div>
)

export default ShopPage
