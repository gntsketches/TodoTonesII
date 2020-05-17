import React, { Component } from 'react'
import {connect} from "react-redux"
// import 'bulma/css/bulma.css'

import services from '../services'
import {
  addTodo,
  updateTodo,
  deleteTodo,
  fetchTodos,
  setEditingTodo,
  setNowPlaying,
  playPause,
  setPlaylist,
  changePlayMode,
} from '../redux/actions/todos'

const Todo = ({ todo, id, onDelete, onLeftClick, onRightClick, highlighted, playing }) => {
  const todoStyles = {
    padding: '5px',
    marginBottom: '10px',
    border: highlighted ? '2px solid purple' : '2px solid transparent',
    cursor: 'pointer',
  }

  return (
    <div
      className="box todo-item level is-mobile"
      style={todoStyles}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      <div className="level-left">
        {playing ? <span>&#9834;&nbsp;</span> : <span>&nbsp;&nbsp;</span>}
          {/*&#9834 should glow/move when playing!*/}
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
  constructor() {
    super();

    this.state = {
      tagFilters: [],
    }
  }

  componentDidMount() {
    // this.props.fetchTodos()
  }

  updateTagFilters(tag) {
    const { tagFilters } = this.state

    if (tagFilters.includes(tag)) {
      this.setState({tagFilters: tagFilters.filter(e => e !== tag)})
    } else {
      this.setState({tagFilters: [...tagFilters, tag]})
    }
  }

  renderTags() {
    const { tagFilters } = this.state
    const { userTodos } = this.props
    // console.log('tagFilters', tagFilters)

    const tagList = []
    userTodos.forEach(todo => {  // do with reduce!
      todo.tags.forEach(tag => {
        if (!tagList.includes(tag)) tagList.push(tag)
      })
    })

    const tagListJSX = tagList.map(tag => {
      const background = tagFilters.length === 0 || tagFilters.includes(tag) ? 'white' : '#888'
      const color = tagFilters.length === 0 || tagFilters.includes(tag) ? '#888' : 'white'

      return (
      <div
       style={{
         background: background, color: color,
         padding: '0 2px', margin: '0 0 5px 5px',
         borderRadius: '3px',
         userSelect: 'none', cursor: 'pointer',
       }}
       onClick={() => this.updateTagFilters(tag)}
      >
        {tag}
      </div>
    )})
    return tagListJSX
  }


  handleDelete = (e, todo) => {
    e.stopPropagation()
    services.userTodosAPI.deleteTodo(todo._id)
    .then((res) => res.json())
    .then((todoDeleteResponse) => {
      // console.log('todo save data', todoDeleteResponse)
      if (this.props.editingTodo._id === todo._id) {
        this.props.setEditingTodo({title: '', description: '', tags: ''}) // if you're going to keep doing that it should be a constant!
      }
      this.props.fetchPublicUserTodos()
    })
    // .catch((err) => console.log(err))
  }

  get tagSelections() {  // todosByTag?
    const { tagFilters } = this.state
    const { userTodos } = this.props

    if (tagFilters.length === 0) return userTodos

    const tagSelections = []
    tagFilters.forEach(tag => {
      userTodos.forEach(todo => {
        // console.log('todo.tags & tag', todo.tags, tag)
        if (todo.tags.includes(tag) && !tagSelections.includes(todo)) {
          tagSelections.push(todo)
        }
      })
    })

    return tagSelections
  }

  handlePlaySelection = () => {
    this.props.setPlaylist(this.tagSelections)
  }


  render() {
    const {
      userTodos, isLoading, isSaving, error, editingTodo, nowPlaying, isPlaying,
      deleteTodo, setEditingTodo, setNowPlaying, playPause, playMode, changePlayMode,
    } = this.props
    // console.log('this props', this.props)
    // console.log('playMode', playMode)

    return (

        <section className="column is-4">


          <div className="level field has-addons" style={{ justifyContent: 'space-around' }}>

            <h1 className="title" style={{marginBottom: '0'}}>List</h1>

            <div className="control">
              <button
                className="control button"
                disabled={this.tagSelections.length === 0}
                onClick={this.handlePlaySelection}
              >
                Play List
              </button>
            </div>
            <div className="control">
              <button
                className="control button"
                disabled={!isPlaying}
                onClick={() => playPause('pause')}
              >
                Pause
              </button>
            </div>
            <div className="control">
              <button
                className="control button"
                onClick={changePlayMode}
              >
                {playMode}
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex', padding: '5px',
            }}
          >
            {this.renderTags()}
          </div>

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
            style={{maxHeight: '70vh', overflowY: 'auto'}}
          >
          {this.tagSelections.map(todo => (
            <Todo
              playing={nowPlaying._id === todo._id && nowPlaying.description === todo.description}
              highlighted={todo._id === editingTodo._id}
              key={todo._id}
              id={todo._id}
              todo={todo}
              onDelete={e => this.handleDelete(e, todo)}
              onLeftClick={() => setEditingTodo(todo)}
              onRightClick={(e) => {
                e.preventDefault()
                setNowPlaying(todo)
                if (nowPlaying._id === todo._id) playPause()
                else playPause('play')
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
    isPlaying: state.todos.isPlaying,
    error: state.todos.error,
    editingTodo: state.todos.editingTodo,
    nowPlaying: state.todos.nowPlaying,
    playMode: state.todos.playMode,
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
  setPlaylist,
  changePlayMode,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListing)
