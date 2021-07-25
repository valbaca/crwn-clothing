import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CollectionPreview from '../../components/collection-preview/collection-preview.jsx'
import CollectionsOverview from '../../components/collections-overview/collections-overview.jsx'
import { selectCollections } from '../../redux/shop/shop-selectors.js'

const ShopPage = ({ collections }) => (
  <div className="shop-page">
    <CollectionsOverview/>
  </div>
)



export default ShopPage
