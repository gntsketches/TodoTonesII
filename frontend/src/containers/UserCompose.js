import React, { Component } from 'react'

import services from '../services'
import LeftPanel from "./LeftPanel"
import TodoEditor from "./TodoEditor"
import TodoListing from "./TodoListing"
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
  }

  fetchPublicUserTodos = (callback) => {
    const { user } = this.props
    // console.log('user in User', user)
    services.userTodosAPI.fetchPublicUserTodos(this.state.userURLFrag)
    .then((res) => res.json())
    .then((data) => {
      // console.log('data', data)
      this.setState({todos: data}, callback)
    })
    // .catch((err) => console.log(err))
  }

  render() {
    const { userURLFrag } = this.state
    const { user } = this.props

    return (
      <div className="columns is-gapless">
        <div className="column is-1"></div>
        <TodoEditor
          fetchPublicUserTodos={this.fetchPublicUserTodos}
        />
        <div className="column is-2"></div>
        <TodoListing
          userTodos={this.state.todos}
          fetchPublicUserTodos={this.fetchPublicUserTodos}
        />
        <div className="column is-1"></div>
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
