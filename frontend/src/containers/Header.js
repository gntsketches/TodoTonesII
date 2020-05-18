import React, { Component } from 'react'
import {connect} from "react-redux"
import { Link } from 'react-router-dom';

import {
  addTodo, deleteTodo, fetchTodos, updateTodo, playPause, toggleListPlay,
  advancePlayCounter,
} from "../redux/actions/todos"
import {logoutUser} from "../redux/actions/auth"
import images from '../assets/images/index.js'


class Header extends Component {

  handlePlayPauseClick = () => {
    const { playPause, isPlaying } = this.props
    if (isPlaying) {
      playPause('pause')
    } else {
      playPause('play')
    }
  }

  render() {
    const { nowPlaying, todos, isPlaying, user, toggleListPlay, listPlay } = this.props;
    // console.log('user in header', user)
    console.log("now playing in header", nowPlaying)
    // console.log("todos in header", todos)

    const title = nowPlaying ? nowPlaying.title : 'Untitled'

    return (
      <section
        // className="hero is-primary"
        className="columns"
        style={{
         "display": "flex", "alignItems": "center",
          "minHeight": "125px",
          "paddingTop": "12px",
          "backgroundColor": "#00d1b2",
        }}
      >
          <div className="column is-3">
            <h1 className="title white level-item">Todo Tones II</h1>
          </div>
        <div className="column is-6">
          <div>
            <span className="title is-5">{title}</span>
            {nowPlaying.username && nowPlaying.username !== user.username ?
              <span> by {nowPlaying.username}</span> : null }
          </div>
          <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
            <button
              className="button"
              disabled={nowPlaying == null}
              onClick={() => this.props.advancePlayCounter(true)}
              style={{ margin: "2px", display: listPlay ? 'inline' : 'none' }}
            >
              {listPlay ? <img src={images.back} width="20px" height="20px" /> : null }
            </button>
            <button
              className="button"
              disabled={nowPlaying == null}
              onClick={this.handlePlayPauseClick}
              style={{margin: "2px"}}
            >
              {isPlaying ?
                <img src={images.stop} width="20px" height="20px" />
                : <img src={images.play} width="20px" height="20px" />
              }
            </button>
            <button
              className="button"
              disabled={nowPlaying == null}
              onClick={this.props.advancePlayCounter}
              style={{ margin: "2px", display: listPlay ? 'inline' : 'none' }}
            >
              <img src={images.next} width="20px" height="20px" />
            </button>
          </div>
          <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
            <button
              className="button"
              disabled={nowPlaying == null}
              onClick={() => toggleListPlay()}
              style={{margin: "2px", height: "18px", fontSize: "10px", padding: "1px 5px"}}
            >
              {listPlay ? 'Playing Todo-List' : 'Playing Todo-Item'}
            </button>
          </div>
        </div>

        { user === false ? (
          <div
            className="column is-3"
            style={{"display": "flex", "justifyContent": "space-around"}}
          >
            <Link to={'/login'}> Login </Link>
            <Link to={'/register'}> Register </Link>
          </div>
        ) : (
          <div
            className="column is-3"
            style={{"display": "flex", "justifyContent": "space-around"}}
          >
            <a onClick={this.props.logoutUser}>Logout</a>
          </div>
        )}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    // isLoading: state.todos.loading,
    // isSaving: state.todos.saving,
    // error: state.todos.error,
    nowPlaying: state.todos.nowPlaying,
    isPlaying: state.todos.isPlaying,
    listPlay: state.todos.listPlay,

    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  // fetchTodos,
  // addTodo,
  // updateTodo,
  // deleteTodo,
  playPause,
  toggleListPlay,
  logoutUser,
  advancePlayCounter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

