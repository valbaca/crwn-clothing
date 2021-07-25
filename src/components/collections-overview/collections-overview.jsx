import React from 'react'
import './collections-overview.scss'
import CollectionPreview from '../collection-preview/collection-preview'
import { connect } from 'react-redux'
import { selectCollections } from '../../redux/shop/shop-selectors'
import { createStructuredSelector } from 'reselect'

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})

export default connect(mapStateToProps)(CollectionsOverview)
