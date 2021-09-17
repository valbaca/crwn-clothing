import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import Header from "./components/header/header.jsx"
import GlobalStyle from "./global.styles.js"
import CheckoutPage from "./page/checkout/checkout.jsx"
import HomePage from "./page/homepage/homepage.jsx"
import ShopPage from "./page/shop/shop.jsx"
import SignInAndSignUpPage from "./page/sign-in-and-sign-up/sign-in-and-sign-up.jsx"
import { checkUserSession } from "./redux/user/user-actions.js"
import { selectCurrentUser } from "./redux/user/user-selectors.js"

const App = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <div>
      <GlobalStyle />
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

export default App
