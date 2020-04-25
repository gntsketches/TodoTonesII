import React, { Component } from 'react'
import {connect} from "react-redux"

import './App.css'
import Header from "./containers/Header"
import RightPanel from "./containers/RightPanel"
import Todos from './containers/Todos'
import LeftPanel from "./containers/LeftPanel"
import {addTodo, deleteTodo, fetchTodos, updateTodo} from "./actions/todos"

class App extends Component {

  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="columns">
          <LeftPanel />
          <Todos />
          <RightPanel />
        </div>
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
