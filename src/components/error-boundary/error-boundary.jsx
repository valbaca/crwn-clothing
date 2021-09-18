import React from "react"
import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText
} from "./error-boundary-styles.js"

class ErrorBoundary extends React.Component {
  constructor() {
    super()
    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true }
  }

  componentDidCatch(error) {
    console.error(error)
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/lKJiT77.png" />
          <ErrorImageText>Sorry this page is broken!</ErrorImageText>
        </ErrorImageOverlay>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
