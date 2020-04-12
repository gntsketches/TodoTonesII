import React, { Component } from 'react'
import {connect} from "react-redux"
// import 'bulma/css/bulma.css'

import { addTodo, toggleTodo, deleteTodo, fetchTodos } from '../actions/todos';

const Todo = ({ todo, id, onDelete, onToggle }) => (
  <div className="box todo-item level is-mobile">
    <div className="level-left">
      <span>{todo.title ? todo.title : 'untitled'}</span>
      {/*<span>{todo._id}</span>*/}
    </div>
    <div className="level-right">
      <a className="delete level-item" onClick={onDelete}>Delete</a>
    </div>
  </div>
)

class LeftSide extends Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    const { todos, isLoading, isSaving, error, deleteTodo, toggleTodo } = this.props

    return (

        <section className="column is-3">
          <h1 className="title">Todos</h1>
          <h2 className="subtitle">Listing them below</h2>
          <div className="container todo-list">
            {todos.map(todo => (
              <Todo
                key={todo._id}
                id={todo._id}
                todo={todo}
                onDelete={() => deleteTodo(todo._id)}
                // onToggle={() => toggleTodo(todo._id)}
              />
             ))}
          </div>

        </section>
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
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide)
