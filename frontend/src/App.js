import React, { Component } from 'react'

import './App.css'
import Header from "./containers/Header"
import LeftSide from "./containers/LeftSide"
import Todos from './containers/Todos'
import RightSide from "./containers/RightSide"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="columns">
          <LeftSide />
          <Todos />
          <RightSide />
        </div>
      </div>
    )
  }
}

export default App
