import React, { Component } from 'react'

import services from '../services'
import LeftPanel from "./LeftPanel"
import TodoEditor from "./TodoEditor"
import RightPanel from "./RightPanel"
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  playPause,
  setEditingTodo,
  setNowPlaying,
  updateTodo
} from "../redux/actions/todos"
import {connect} from "react-redux"


class User extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      userURLFrag: window.location.href.split('/')[4],
    }
  }

  componentDidMount() {
    const userURLFrag = window.location.href.split('/')[4]
    console.log('url', userURLFrag)
    console.log(this.state)
    this.fetchPublicUserTodos()
  }

  componentDidUpdate() {
    // this.fetchUserTodos()
  }

  fetchPublicUserTodos = () => {
    const { user } = this.props
    // console.log('user in User', user)
    services.userTodosAPI.fetchPublicUserTodos(this.state.userURLFrag)
    .then((res) => res.json())
    .then((data) => {
      // console.log('data', data)
      this.setState({todos: data})
    })
    // .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="columns">
        <TodoEditor
          fetchPublicUserTodos={this.fetchPublicUserTodos}
        />
        <RightPanel
          userTodos={this.state.todos}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    isLoading: state.todos.loading,
    isSaving: state.todos.saving,
    error: state.todos.error,
    editingTodo: state.todos.editingTodo,
    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo,
  fetchTodos,
  setEditingTodo,
  setNowPlaying,
  playPause,

}

export default connect(mapStateToProps, mapDispatchToProps)(User)
