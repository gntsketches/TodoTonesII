import React, { Component } from 'react'
import {connect} from "react-redux"

// import {addTodo, deleteTodo, fetchTodos, updateTodo} from "../actions/todos"

class Header extends Component {

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
  }
}

const mapDispatchToProps = {
  // fetchTodos,
  // addTodo,
  // updateTodo,
  // deleteTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

