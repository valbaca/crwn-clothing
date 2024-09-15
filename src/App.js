import React, { lazy, Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
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

const SignInPage = () => {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <>
      {currentUser ? (
        <Navigate relative="false" to="/" />
      ) : (
        <SignInAndSignUpPage />
      )}
    </>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <div>
      <GlobalStyle />
      <Header />

      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/shop/*" element={<ShopPage />} />
            <Route exact path="/checkout" element={<CheckoutPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
