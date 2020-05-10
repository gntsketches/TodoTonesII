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
    }
  }

  componentDidMount() {
    this.fetchUserTodos()
  }

  componentDidUpdate() {
    // this.fetchUserTodos()
  }

  fetchUserTodos = () => {
    const { user } = this.props
    console.log('user in User', user)
    services.userTodosAPI.listTodos(user._id)
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
          fetchUserTodos={this.fetchUserTodos}
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
