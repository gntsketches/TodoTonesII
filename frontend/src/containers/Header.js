import React, { Component } from 'react'
import {connect} from "react-redux"

import {addTodo, deleteTodo, fetchTodos, updateTodo, play} from "../actions/todos"

class Header extends Component {

  handlePlayPauseClick = () => {
    console.log('click')
    const { nowPlaying, play } = this.props

    play(nowPlaying)
  }

  render() {
    const { nowPlaying, todos } = this.props;
    console.log("now playing in header", nowPlaying)
    console.log("todos in header", todos)
    const title = nowPlaying ? nowPlaying.title : null

    return (
      <section
        className="hero is-primary"
        style={{"minHeight": "15vh", "marginBottom": "5vh"}}
      >
        <div className="hero-body">
          <h1 className="title white level-item">Todo Tones II</h1>
        </div>
        <div>
          <button
            className={`button`}
            disabled={nowPlaying == null}
            onClick={this.handlePlayPauseClick}
          >
            Play/Pause
          </button>
          <span>Now Playing: </span>
          <span>{title}</span>
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
  play,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

