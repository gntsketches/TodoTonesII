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
  changeListPlayMode,
  toggleListPlay,
  advancePlayCounter,
} from '../redux/actions/todos'
import images from '../assets/images/index.js'


const Todo = ({ todo, id, onDelete, onLeftClick, onRightClick, highlighted, playing }) => {
  const todoStyles = {
    padding: '5px',
    marginBottom: '10px',
    border: highlighted ? '1px solid #000' : '1px solid transparent',
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
    this.props.fetchPublicUserTodos(()=> {
      this.setState({tagFilters: this.tagList}, this.updatePlaylist)
    })
  }

  componentDidUpdate() {
    const { playlist, setPlaylist } = this.props;
    if (playlist.length === 0 && this.todosByTagSelection.length !== 0) {
      // console.log('length 0')
      setPlaylist(this.todosByTagSelection, true, false)
    }
  }

  handlePlaySelection = () => {
    // console.log('TodoListing handlePlaySelection props', this.props)
    this.props.toggleListPlay(true)
    this.props.setPlaylist(this.todosByTagSelection, true, true)
    // console.log('handlePlaySelection playList', this.props.playlist)
    // this.props.setNowPlaying(this.props.playlist[0])  // testing redux synchronous. vs doing this in Sagas. this references previous state! clear localstorage and try it...
    // this.props.playPause('play')
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

  updateTagFilters(tag, setAsOnly) {
    const { tagFilters } = this.state
    // console.log('tag, tagFilters', tag, tagFilters)

    if (setAsOnly) {
      // console.log('setAsOnly')
      if (tagFilters.length === 1 && tagFilters[0] === tag) {
        this.setState({tagFilters: this.tagList}, this.updatePlaylist)
      } else {
        this.setState({tagFilters: [tag]}, this.updatePlaylist)
      }
    } else {
      if (tagFilters.includes(tag)) {
        const newTagFilters = tagFilters.filter(e => e !== tag)
        this.setState({tagFilters: newTagFilters}, ()=> {
          this.updatePlaylist()
        })
      } else {
        this.setState({tagFilters: [...tagFilters, tag]}, this.updatePlaylist)
      }
    }
  }

  updatePlaylist = () => {
    const { userTodos, playlist , setPlaylist} = this.props

    if (playlist[0] && userTodos[0] && playlist[0].username === userTodos[0].username) {
      setPlaylist(this.todosByTagSelection, false, false)
    }
  }

  get todosByTagSelection() {
    const { tagFilters } = this.state
    const { userTodos } = this.props

    // if (tagFilters.length === 0) return userTodos

    const todosByTagSelection = []
    // note now this puts todos in the order of the tagFilters array... switching them around...
    userTodos.forEach(todo => {
      tagFilters.forEach(tag => {
        // console.log('todo.tags & tag', todo.tags, tag)
        if (todo.tags.includes(tag) && !todosByTagSelection.includes(todo)) {
          todosByTagSelection.push(todo)
        }
      })
    })

    return todosByTagSelection
  }

  get tagList() {
    const { userTodos } = this.props

    const tagList = []
    userTodos.forEach(todo => {  // do with reduce!
      todo.tags.forEach(tag => {
        if (!tagList.includes(tag)) tagList.push(tag)
      })
    })

    return tagList
  }


  renderTags() {
    const { tagFilters } = this.state
    // console.log('renderTags tagFilters', tagFilters)

    const tagListJSX = this.tagList.map((tag, i) => {
      // const background = tagFilters.length === 0 || tagFilters.includes(tag) ? 'white' : '#888'
      const background = tagFilters.includes(tag) ? 'white' : '#888'
      const color = tagFilters.includes(tag) ? '#888' : 'white'

      return (
      <div
        key={'TodoListing'+i+tag}
        style={{
          background: background, color: color,
          padding: '0 2px', margin: '0 0 5px 5px',
          borderRadius: '3px', minWidth: '40px',
          userSelect: 'none', cursor: 'pointer',
        }}
        onClick={() => {
          // console.log('onClick')
          this.updateTagFilters(tag)
        }}
        onContextMenu={(e) => {
          // console.log('onContextMenu')
          e.preventDefault()
          this.updateTagFilters(tag, true)
        }}
      >
        {tag}
      </div>
    )})
    return tagListJSX
  }


  render() {
    const {
      userTodos, isLoading, isSaving, error, editingTodo, nowPlaying, isPlaying,
      deleteTodo, setEditingTodo, setNowPlaying, playPause, advancePlayCounter,
      listPlay, listPlayMode, changeListPlayMode,
    } = this.props
    // console.log('TodoListing render props', this.props)


    return (

        <section className="column is-4">


          <div className="level field has-addons" style={{ justifyContent: 'space-around' }}>

            <h1 className="title" style={{marginBottom: '0'}}>List</h1>

            <div className="control">
              <button
                className="control button"
                disabled={this.todosByTagSelection.length === 0}
                onClick={this.handlePlaySelection}
              >
                <img src={images.play} width="20px" height="20px" />
              </button>
            </div>
            <div className="control">
              <button
                className="control button"
                disabled={!isPlaying}
                onClick={() => playPause('pause')}
              >
                <img src={images.stop} width="20px" height="20px" />
              </button>
            </div>
            <div className="control">
              <button
                className="control button"
                disabled={!listPlay}
                onClick={changeListPlayMode}
              >
                {listPlayMode}
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
          {this.todosByTagSelection.map((todo, index)=> (
            <Todo
              playing={nowPlaying && nowPlaying._id === todo._id && nowPlaying.description === todo.description}
              highlighted={todo._id === editingTodo._id}
              key={todo._id}
              id={todo._id}
              todo={todo}
              onDelete={e => this.handleDelete(e, todo)}
              onLeftClick={(e) => {
                e.preventDefault()
                setNowPlaying(todo)
                advancePlayCounter(index)
                if (nowPlaying && nowPlaying._id === todo._id) playPause()
                else playPause('play')
              }}
              onRightClick={(e) => {
                e.preventDefault()
                setEditingTodo(todo)
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
    state,
    // todos: state.todos.items,
    isLoading: state.todos.loading,
    isSaving: state.todos.saving,
    isPlaying: state.todos.isPlaying,
    error: state.todos.error,
    editingTodo: state.todos.editingTodo,
    nowPlaying: state.todos.nowPlaying,
    listPlay: state.todos.listPlay,
    listPlayMode: state.todos.listPlayMode,
    playlist: state.todos.playlist,
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
  changeListPlayMode,
  toggleListPlay,
  advancePlayCounter,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListing)
