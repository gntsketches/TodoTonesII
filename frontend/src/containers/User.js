import React, { Component } from 'react'

import LeftPanel from "./LeftPanel"
import Todos from "./Todos"
import RightPanel from "./RightPanel"


class User extends Component {

  componentDidMount() {}

  render() {
    return (
      <div className="columns">
        <LeftPanel />
        <Todos />
        <RightPanel />
      </div>
  )
  }
}


export default User
