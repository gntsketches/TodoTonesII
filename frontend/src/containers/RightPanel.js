import React, { Component } from 'react'
import {connect} from "react-redux"
// import 'bulma/css/bulma.css'

import { addTodo, updateTodo, deleteTodo, fetchTodos, setEditingTodo, setNowPlaying } from '../actions/todos';

const Todo = ({ todo, id, onDelete, onLeftClick, onRightClick }) => (
  <div
    className="box todo-item level is-mobile"
    onClick={onLeftClick}
    onContextMenu={onRightClick}
  >
    <div className="level-left">
      <span>{todo.title ? todo.title : 'untitled'}</span>
      {/*<span>{todo._id}</span>*/}
    </div>
    <div className="level-right">
      <a className="delete level-item" onClick={onDelete}>Delete</a>
    </div>
  </div>
)

class RightPanel extends Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    const { todos, isLoading, isSaving, error, deleteTodo, editingTodo, setEditingTodo, setNowPlaying } = this.props
    // console.log('left side todos', todos)

    return (

        <section className="column is-3">
          <h1 className="title">Todos</h1>

          {/*<p className="">Now Editing</p>*/}

          {/*<div*/}
          {/*  className="box todo-item level is-mobile"*/}
          {/*  style={{"box-shadow": "2px 2px 2px 2px"}}*/}
          {/*>*/}
          {/*  <div className="level-left">*/}
          {/*    <span>{editingTodo.title ? editingTodo.title : 'untitled'}</span>*/}
          {/*    /!*<span>{todo._id}</span>*!/*/}
          {/*  </div>*/}
          {/*  /!*<div className="level-right">*!/*/}
          {/*    /!*<a className="delete level-item" onClick={() => deleteTodo(editingTodo._id)}>Delete</a>*!/*/}
          {/*  /!*</div>*!/*/}
          {/*</div>*/}

          <p className="">Repertoire</p>

          {todos.map(todo => (
            <Todo
              key={todo._id}
              id={todo._id}
              todo={todo}
              onDelete={(e) => {
                e.stopPropagation()
                deleteTodo(todo._id)
              }}
              onLeftClick={() => setEditingTodo(todo)}
              onRightClick={(e) => {
                e.preventDefault()
                setNowPlaying(todo)
              }}
            />
           ))}

        </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    isLoading: state.todos.loading,
    isSaving: state.todos.saving,
    error: state.todos.error,
    editingTodo: state.todos.editingTodo,
  }
}

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo,
  fetchTodos,
  setEditingTodo,
  setNowPlaying,
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel)
