import React, { Component } from 'react'
import {BrowserRouter, Router, Route } from 'react-router-dom'
import history from './utils/history'
import {connect} from "react-redux"

import './App.css'
import Header from "./containers/Header"
import Login from "./containers/Login"
import User from "./containers/User"

import {addTodo, deleteTodo, fetchTodos, updateTodo} from "./actions/todos"


class App extends Component {

  componentDidMount() {
    console.log('loggedIn: ', this.props.loggedIn)
    if (this.props.loggedIn) {
      history.push('/user');
    }
  }

  componentDidUpdate() {
    console.log('loggedIn: ', this.props.loggedIn)
    if (this.props.loggedIn) {
      history.push('/user');
    }
  }

  render() {
    // <BrowserRouter> vs <Router>
    return (
      <div className="App">
        <Router history={history}>
          <Header />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={User} />
        </Router>
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
    loggedIn: state.user.loggedIn,
  }
}

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
