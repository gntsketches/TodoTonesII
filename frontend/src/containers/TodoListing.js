import React, { Component } from 'react'
import {connect} from "react-redux"
// import 'bulma/css/bulma.css'

import services from '../services'
import { addTodo, updateTodo, deleteTodo, fetchTodos, setEditingTodo, setNowPlaying } from '../redux/actions/todos';

const Todo = ({ todo, id, onDelete, onLeftClick, onRightClick, highlighted }) => {
  const highlightStyles = highlighted ?
    { border: '1px solid green' } : { border: '1px solid transparent' }

  return (
    <div
      className="box todo-item level is-mobile"
      style={highlightStyles}
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
}

class TodoListing extends Component {

  componentDidMount() {
    // this.props.fetchTodos()
  }

  render() {
    const { userTodos, isLoading, isSaving, error, deleteTodo, editingTodo, setEditingTodo, setNowPlaying } = this.props
    // console.log('RightPanel todos', userTodos)

    return (

        <section className="column is-4">
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


          <div
            style={{maxHeight: '70vh', overflowY: 'scroll'}}
          >
          {userTodos.map(todo => (
            <Todo
              highlighted={todo._id === editingTodo._id}
              key={todo._id}
              id={todo._id}
              todo={todo}
              onDelete={(e) => {
                e.stopPropagation()
                services.userTodosAPI.deleteTodo(todo._id)
                .then((res) => res.json())
                .then((todoDeleteResponse) => {
                  console.log('todo save data', todoDeleteResponse)
                  if (this.props.editingTodo._id === todo._id) {
                    this.props.setEditingTodo({title: '', description: '', tags: ''}) // if you're going to keep doing that it should be a constant!
                  }
                  this.props.fetchPublicUserTodos()
                })
                // .catch((err) => console.log(err))
              }}
              onLeftClick={() => setEditingTodo(todo)}
              onRightClick={(e) => {
                e.preventDefault()
                setNowPlaying(todo)
              }}
            />
           ))}
          </div>

        </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // todos: state.todos.items,
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoListing)
