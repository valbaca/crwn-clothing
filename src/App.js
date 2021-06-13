import React from 'react'
import HomePage from './page/homepage/homepage.jsx'
import { Route, Switch } from 'react-router-dom'
import ShopPage from './page/shop/shop.jsx'
import Header from './components/header/header.jsx'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.jsx'

import './App.css'
import { auth } from './firebase/firebase.utils.js'

class App extends React.Component {
  unsubscribeFromAuth = null

  constructor() {
    super()
    this.state = { currentUser: null }
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log(user)
      this.setState({ currentUser: user })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App
