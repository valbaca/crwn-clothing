import React from "react"
import { connect } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import { createStructuredSelector } from "reselect"
import "./App.css"
import Header from "./components/header/header.jsx"
import CheckoutPage from "./page/checkout/checkout.jsx"
import HomePage from "./page/homepage/homepage.jsx"
import ShopPage from "./page/shop/shop.jsx"
import SignInAndSignUpPage from "./page/sign-in-and-sign-up/sign-in-and-sign-up.jsx"
import { selectCollectionsForPreview } from "./redux/shop/shop-selectors.js"
import { setCurrentUser } from "./redux/user/user-actions.js"
import { selectCurrentUser } from "./redux/user/user-selectors.js"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {}

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
