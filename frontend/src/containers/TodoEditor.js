import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import { connect } from 'react-redux'

import services from '../services'
import TodoModel from "../classes/TodoModel"
import {
  addTodo, updateTodo, deleteTodo, fetchTodos,
  setEditingTodo, setNowPlaying, playPause
} from '../redux/actions/todos';


class TodoEditor extends Component {

  clearEditingTodo = () => {
    // compare for changes and warn of overwrite
    const todo = { title: '', description: '', tags: ''}  // also using this in TodoListing, make it a constant...?
    this.props.setEditingTodo(todo)
  }

  handleSaveClick = () => {
    const { editingTodo, setEditingTodo, user } = this.props

    if(editingTodo.title || editingTodo.description) {

      const todoModel = new TodoModel(editingTodo.description)
      // const newTodoModelText = new TodoModel(editingTodo.description).text  // can you do like that?
      const newEditingTodo = {
        ...editingTodo,
        description: todoModel.text,
      }

      // OK below you're passing in the newEditingTodo. BUT how would it work if you referred to the editingTodo (ie from Redux) below instead? Ie: do you need to try to make this async? Handle in Sagas? Like with setState it is async and unreliable, you need to use the callback
      //    because if you abstract this so you can setEditingTodo on handlePlayClick you'll want to.
      console.log('TodoEditor newEditingTodo', newEditingTodo)
      if (newEditingTodo._id == null) {
        // this.props.addTodo(newEditingTodo)
        services.userTodosAPI.createTodo(newEditingTodo, user._id)
        .then((res) => res.json())
        .then((savedTodoData) => {
          this.props.fetchPublicUserTodos()
          setEditingTodo(savedTodoData)
        })
        // .catch((err) => console.log(err))
      } else {
        services.userTodosAPI.updateTodo(newEditingTodo, user._id)
        .then((res) => res.json())
        .then((newTodoData) => {
          this.props.fetchPublicUserTodos()
          setEditingTodo(newTodoData)
        })
        .catch((err) => console.log(err))
      }
    // else show a message that says they need title or description
    }
  }

  handlePlayClick = () => {
    const { editingTodo, setEditingTodo, setNowPlaying, playPause, nowPlaying } = this.props

    const todoModel = new TodoModel(editingTodo.description) // you are setting a new TodoModel twice - also in reducers...
    // console.log('handlePlayClick todoModel', todoModel)
    const newTodo = {
      ...editingTodo,
      description: todoModel.text,
      playableTodo: todoModel,
    }

    setEditingTodo(newTodo)
    // console.log('nowPlaying Pre', nowPlaying)
    setNowPlaying(newTodo)
    // console.log('newPlaying post', nowPlaying)
    // this is fishy. will it necessarily happen after setNowPlaying?
      // also, it toggles the nowPlaying (without stopping it).
        // so that's weird. a case for passing the boolean rather than a toggle
    playPause('play')
  }

  handleFieldUpdate(field, value) {
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
      editingTodo, isPlaying, nowPlaying,
      isLoading, isSaving, error, setNowPlaying,
      playPause
    } = this.props
    // console.log('todos', todos)
    // console.log('editingTodo', editingTodo)

    return (
      <section className="column  is-4">

        <div className="error">{error}</div>

        <div className="level field has-addons" style={{ justifyContent: 'space-around' }}>
          <div className="control">
            <button
              className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
              disabled={isLoading || isSaving}
              onClick={this.handleSaveClick}
              // text should be 'add' for no _id
            >
              {editingTodo._id ? 'Update' : 'Save'}
            </button>
          </div>
          <div className="control">
            <button
              className="control button"
              disabled={!editingTodo.description}
              // disabling for now if no _id, later should check content and save?
              // or since you're passing in the whole todo, maybe it's fine, just check for untitled...
              onClick={this.handlePlayClick}
            >
              Play
            </button>
          </div>
          <div className="control">
            <button
              className="control button"
              disabled={!isPlaying}
                // disable if it's not this todo playing? complicated code and uncertain UI benefit
              onClick={() => playPause('pause')}
            >
              Pause
            </button>
          </div>
          <div className="control">
            <button
              className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
              disabled={isLoading || isSaving}
              onClick={this.clearEditingTodo}
            >
              New
            </button>
          </div>
        </div>


        <div className="level" style={{ justifyContent: 'center' }}>
          <div className="control"
               style={{flex: '1'}}
          >
            <input
              className="input"
              value={editingTodo.title}
              placeholder="title..."
              onChange={(e) => this.handleFieldUpdate( 'title', e.target.value )}
            />
          </div>
        </div>


        <div className="level field has-addons" style={{ justifyContent: 'center' }}>
          <div className="control">
            <textarea
            style={{ padding: '0 2px', border: '2px solid #ddd', borderRadius: '8px', }}
            className="level-item"
            placeholder="c d e ..."
            value={editingTodo.description}
            onChange={(e) => this.handleFieldUpdate('description', e.target.value)}
            rows="10"
            cols="65"
          />
          </div>
        </div>



        <div className="level field has-addons" style={{ justifyContent: 'center' }}>
          <p>Tags&nbsp;</p>
          <input
            className="input"
            value={editingTodo.tags}
            placeholder="descriptor words for this Todo"
            onChange={(e) => this.handleFieldUpdate( 'tags', e.target.value )}
          />
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
    isPlaying: state.todos.isPlaying,
    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo,
  fetchTodos,
  setEditingTodo,
  setNowPlaying,
  playPause,

}

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditor)


