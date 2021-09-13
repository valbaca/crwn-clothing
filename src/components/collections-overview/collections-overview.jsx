import React from "react"
import { useSelector } from "react-redux"
import { selectCollectionsForPreview } from "../../redux/shop/shop-selectors"
import CollectionPreview from "../collection-preview/collection-preview"
import "./collections-overview.scss"

const CollectionsOverview = () => {
  const collections = useSelector(selectCollectionsForPreview)
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} {...otherProps} />
      ))}
    </div>
  )
}

export default CollectionsOverview
