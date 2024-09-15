import React, { lazy, Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Switch } from "react-router-dom"
import { CompatRoute } from "react-router-dom-v5-compat"
import ErrorBoundary from "./components/error-boundary/error-boundary.jsx"
import Header from "./components/header/header.jsx"
import Spinner from "./components/spinner/spinner.jsx"
import GlobalStyle from "./global.styles.js"
import HomePage from "./page/homepage/homepage.jsx"
import { checkUserSession } from "./redux/user/user-actions.js"
import { selectCurrentUser } from "./redux/user/user-selectors.js"

// NOT making the HomePage lazy b/c it's the first page seen
const ShopPage = lazy(() => import("./page/shop/shop.jsx"))
const CheckoutPage = lazy(() => import("./page/checkout/checkout.jsx"))
const SignInAndSignUpPage = lazy(() =>
  import("./page/sign-in-and-sign-up/sign-in-and-sign-up.jsx")
)

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
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <CompatRoute exact path="/" component={HomePage} />
            <CompatRoute path="/shop" component={ShopPage} />
            <CompatRoute exact path="/checkout" component={CheckoutPage} />
            <CompatRoute
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  )
}

export default App
