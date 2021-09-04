import React, { useEffect } from "react"
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
import { checkUserSession } from "./redux/user/user-actions.js"
import { selectCurrentUser } from "./redux/user/user-selectors.js"

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

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
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
