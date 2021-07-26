import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCollectionsForPreview } from "../../redux/shop/shop-selectors"
import CollectionPreview from "../collection-preview/collection-preview"
import "./collections-overview.scss"

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)
