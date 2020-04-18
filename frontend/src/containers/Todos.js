import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import { connect } from 'react-redux'

import TodoModel from "../classes/TodoModel"
import { addTodo, updateTodo, deleteTodo, fetchTodos, setEditingTodo, setNowPlaying} from '../actions/todos';



class Todos extends Component {
  state = {
    // editingID: null,
  }

  // componentDidUpdate() {
  //   const { editingID } = this.state
  //   const { todos, editingTodoID } = this.props

    // console.log('editingTodoID in todos', editingTodoID)
    // if (editingTodoID != null && editingID !== editingTodoID) {
    //   const editingTodo = todos.find(t => t._id === editingTodoID)
    //   console.log('editingTodo', editingTodo)
    //   this.setState({
    //     editingID: editingTodoID,
    //   })
    // }
  // }

  clearEditingTodo = () => {
    // compare for changes and worn
    const todo = { title: '', description: ''}
    this.props.setEditingTodo(todo)
  }

  // should be saveTodo
  updateTodo = () => {
    const { editingTodo } = this.props
    console.log('editingTodo in update', editingTodo)


    if(editingTodo.description || editingTodo.description) {
      this.props.updateTodo(editingTodo)

      // elsa throw an error

      // this.setState({
      //   newTodoTitle: '',
      //   newTodo: ''
      // })
    }
  }

  setTodo(field, value) {
    const { editingTodo, setEditingTodo } = this.props

    const newTodo = {
      ...editingTodo,
      [field]: value,
    }

    setEditingTodo(newTodo)
  }


  render() {
    const {
      todos,
      editingTodo,
      isLoading, isSaving, error, setNowPlaying
    } = this.props
    // console.log('todos', todos)
    // console.log('editingTodo', editingTodo)

    return (
      <section className="column  is-6">

        <div className="error">{error}</div>

        <div className="level field has-addons" style={{ justifyContent: 'center' }}>
          <div className="control">
            <button
              className="control button"
              disabled={!editingTodo._id}
              // disabling for now if no _id, later should check content and save?
              // or since you're passing in the whole todo, maybe it's fine, just check for untitled...
              onClick={()=>setNowPlaying(editingTodo)}
            >
              Play
            </button>
          </div>
          <div className="control">
            <input className="input"
                   value={editingTodo.title}
                   placeholder="title..."
                   onChange={(e) => this.setTodo( 'title', e.target.value )}/>
          </div>
          <div className="control">
            <button
              className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
              disabled={isLoading || isSaving}
              onClick={this.updateTodo}
            >
              Save
            </button>
          </div>
        </div>

        <div className="level field has-addons" style={{ justifyContent: 'center' }}>
          <div className="control">
          <textarea
            className="level-item"
            value={editingTodo.description}
            onChange={(e) => this.setTodo('description', e.target.value)}
            rows="10"
            cols="75"
          />
          </div>
        </div>

        <div className="level field has-addons" style={{ justifyContent: 'center' }}>
          <div className="control">
            <button
              className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
              disabled={isLoading || isSaving}
              onClick={this.clearEditingTodo}
            >
              Clear
            </button>
          </div>
        </div>

      </section>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Todos)


