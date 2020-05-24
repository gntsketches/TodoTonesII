import React, { Component } from 'react'
import {Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'
import {connect} from "react-redux"

import './App.css'
import Header from "./containers/Header"
import Login from "./containers/Login"
import Register from "./containers/Register"
import UserCompose from "./containers/UserCompose"
import PublicUser from "./containers/PublicUser"

import { addTodo, deleteTodo, fetchTodos, updateTodo, playPause } from "./redux/actions/todos"


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

    window.addEventListener('keydown', this.handleKeydown)
    this.props.playPause('pause')
  }

  componentDidUpdate() {
    // console.log('loggedIn: ', this.props.loggedIn)
    // if (this.props.loggedIn) {
    //   history.push('/user');
    // }
  }

  handleKeydown = e => {
    if (e.key === ' ') this.props.playPause()
  }

  render() {
    // console.log('rendering App')
    const { user } = this.props;
    // console.log('App user', user)

    return (
      <div className="App">
        <Router history={history}>
          <Header />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Switch>
            <Route exact path={`/users/${user.username}`} component={UserCompose} />
            <Route path={`/users/`} component={PublicUser} />
          </Switch>
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
    isPlaying: state.todos.isPlaying,
    error: state.todos.error,
    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  playPause,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
