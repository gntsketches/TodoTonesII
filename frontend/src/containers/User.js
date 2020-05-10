import React, { Component } from 'react'

import LeftPanel from "./LeftPanel"
import TodoEditor from "./TodoEditor"
import RightPanel from "./RightPanel"


class User extends Component {

  componentDidMount() {}

  render() {
    return (
      <div className="columns">
        <TodoEditor />
        <RightPanel />
      </div>
  )
  }
}


export default User
