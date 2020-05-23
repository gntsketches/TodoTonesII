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
      publicUserTodos: [],
      publicUserURLFrag: window.location.href.split('/')[4],
    }
  }

  componentDidMount() {
    // const publicUserURLFrag = window.location.href.split('/')[4]
    // console.log('url', publicUserURLFrag)
    // console.log(this.state)
    this.fetchPublicUserTodos()
  }

  componentDidUpdate() {
    // this.fetchUserTodos()
  }

  fetchPublicUserTodos = () => {
    const { user } = this.props
    // console.log('user in User', user)
    services.userTodosAPI.fetchPublicUserTodos(this.state.publicUserURLFrag)
    .then((res) => res.json())
    .then((data) => {
      // console.log('data', data)
      this.setState({publicUserTodos: data})
    })
    // .catch((err) => console.log(err))
  }

  render() {
    const { userURLFrag } = this.state
    const { user } = this.props

    return (
      <div className="columns">
        <div className="column is-4">
          <h1>
            Profile
          </h1>
        </div>
        <TodoListing
          userTodos={this.state.publicUserTodos}
          fetchPublicUserTodos={this.fetchPublicUserTodos}
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
