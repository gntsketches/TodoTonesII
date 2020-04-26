import React, { Component } from 'react'
import {connect} from "react-redux"

import {addTodo, deleteTodo, fetchTodos, updateTodo, playPause} from "../actions/todos"

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
    const { nowPlaying, todos, isPlaying } = this.props;
    // console.log("now playing in header", nowPlaying)
    // console.log("todos in header", todos)
    const title = nowPlaying ? nowPlaying.title : null

    return (
      <section
        className="hero is-primary"
        style={{
          "minHeight": "15vh", "marginBottom": "5vh",
          "padding": "2px"
        }}
      >
        <div className="hero-body">
          <h1 className="title white level-item">Todo Tones II</h1>
        </div>
        <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
          <button
            className="button"
            disabled={nowPlaying == null}
            onClick={this.handlePlayPauseClick}
            style={{"margin": "2px"}}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div>Now Playing: </div>
          <div>{title == null ? '' : title || 'untitled'}</div>
        </div>
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
  }
}

const mapDispatchToProps = {
  // fetchTodos,
  // addTodo,
  // updateTodo,
  // deleteTodo,
  playPause,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

