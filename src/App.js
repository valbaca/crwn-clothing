import React from 'react'
import HomePage from './page/homepage/homepage.component.jsx'
import { Route, Switch } from 'react-router-dom'
import ShopPage from './page/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'

import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  )
}

export default App
