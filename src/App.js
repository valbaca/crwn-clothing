import React from 'react'
import HomePage from './page/homepage/homepage.jsx'
import { Route, Switch } from 'react-router-dom'
import ShopPage from './page/shop/shop.jsx'
import Header from './components/header/header.jsx'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.jsx'

import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  )
}

export default App
