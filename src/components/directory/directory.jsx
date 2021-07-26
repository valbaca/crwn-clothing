import React from "react"
import MenuItem from "../menu-item/menu-item"
import { connect } from "react-redux"
import { selectDirectorySections } from "../../redux/directory/directory-selector"
import { createStructuredSelector } from "reselect"

import "./directory.scss"

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherProps }) => (
      <MenuItem key={id} {...otherProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)
