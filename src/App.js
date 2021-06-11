import React from 'react'
import HomePage from './page/homepage/homepage.component.jsx'
import {Route} from 'react-router-dom'
import './App.css'

const HatsPage = () => (
  <div><h1>HATS PAGE</h1></div>
)

function App() {
  return (
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/hats" component={HatsPage}/>
    </div>
  )
}

export default App
