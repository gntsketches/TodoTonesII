import React, { Component } from 'react'
import {Router, Route } from 'react-router-dom'
import history from './utils/history'
import {connect} from "react-redux"

import './App.css'
import Header from "./containers/Header"
import Login from "./containers/Login"
import Register from "./containers/Register"
import User from "./containers/User"

import {addTodo, deleteTodo, fetchTodos, updateTodo} from "./redux/actions/todos"


class App extends Component {

  componentDidMount() {
    // console.log('loggedIn: ', this.props.loggedIn)
    // if (this.props.loggedIn) {
    //   history.push('/user');
      /* manage that in a saga...
      START the (login) api call from OUTSIDE the redux&saga system
          (BECAUSE lets say you want a loading indicator, error handling, etc..
              same logic as in the Atlas CRUDs
        then handle the response IN the redux&saga system
      // ... call that saga from the login component via a action
      // a saga called loginRegister that accepts a sessionKey
         login call another function called fetchProfile (or whatever user info)
          because profile is, like, separate from login
      */
    // }
  }

  componentDidUpdate() {
    // console.log('loggedIn: ', this.props.loggedIn)
    // if (this.props.loggedIn) {
    //   history.push('/user');
    // }
  }

  render() {
    console.log('rendering App')
    const { user } = this.props;

    return (
      <div className="App">
        <Router history={history}>
          <Header />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path={`/users/${user.username}`} component={User} />
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
    user: state.user.user,
  }
}

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
