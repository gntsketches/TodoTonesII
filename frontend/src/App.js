import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from "react-redux"

import './App.css'
import Header from "./containers/Header"
import User from "./containers/User"

import {addTodo, deleteTodo, fetchTodos, updateTodo} from "./actions/todos"


class App extends Component {

  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Route exact path="/user" component={User} />
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    isLoading: state.todos.loading,
    isSaving: state.todos.saving,
    error: state.todos.error
  }
}

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
