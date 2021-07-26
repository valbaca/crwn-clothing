import React from 'react'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop-selectors'
import './collection.scss'

const CollectionPage = ({ collection }) => (
  <div className="collection">
    <h2>Collection page</h2>
  </div>
)

// ownProps allows us to use match.params.collectionId to get the :collectionId url param that's passed from ShopPage
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)
