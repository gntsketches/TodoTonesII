import React, { Component } from 'react'
import {connect} from "react-redux"
import { Link } from 'react-router-dom';

import {
  addTodo, deleteTodo, fetchTodos, updateTodo, playPause, toggleListPlay,
  advancePlayCounter, setEditingTodo, setNowPlaying,
} from "../redux/actions/todos"
import {logoutUser} from "../redux/actions/auth"
import images from '../assets/images/index.js'
import TodoModel from "../classes/TodoModel"


class Header extends Component {

  handlePlayPauseClick = () => {
    const {
      playPause, isPlaying, listPlay, editingTodo, setEditingTodo, setNowPlaying,
    } = this.props
    if (isPlaying) {
      playPause('pause')
    } else {
      if (!listPlay) {  // NOTE how this duplicates the code in the TodoEditor
        const todoModel = new TodoModel(editingTodo.description)  // you are setting a new TodoModel twice - also in reducers...
        // console.log('handlePlayClick todoModel', todoModel)
        const newTodo = {
          ...editingTodo,
          description: todoModel.text,
          playableTodo: todoModel,
        }

        setEditingTodo(newTodo)
        // console.log('nowPlaying Pre', nowPlaying)
        setNowPlaying(newTodo)
      }
      playPause('play')
    }
  }

  handleListPlayModeClick = () => {
    const { listPlay, editingTodo, playPause, toggleListPlay } = this.props
    if (listPlay && !editingTodo.description) {
      playPause('pause')
    }
    toggleListPlay()
  }

  render() {
    const {
      nowPlaying, todos, isPlaying, user, toggleListPlay, listPlay,
      playlist, editingTodo,
    } = this.props;
    // console.log('user in header', user)
    // console.log("now playing in header", nowPlaying)

    let title
    if (nowPlaying != null) title = nowPlaying.title ? nowPlaying.title : 'Untitled'

    return (
      <section
        // className="hero is-primary"
        className="columns"
        style={{
         "display": "flex", "alignItems": "center",
          "minHeight": "125px",
          "paddingTop": "12px",
          "backgroundColor": "#00d1b2",
        }}
      >

        <div className="column is-5">
          <h1 className="title white level-item">Todo Tones II</h1>
        </div>

        <div className="column is-2">
          <div>
            <span className="title is-5">{title}</span>
            {/*{nowPlaying && nowPlaying.username && nowPlaying.username !== user.username ?*/}
            {/*should check page difference rather than user difference...*/}
            {nowPlaying && nowPlaying.username && nowPlaying.username !== window.location.href.split('/')[4] ?
              <span> by {nowPlaying.username}</span> : null
            }
          </div>
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <button
              className="button"
              disabled={nowPlaying == null}
              onClick={() => this.props.advancePlayCounter('back')}
              style={{ margin: "2px", display: listPlay ? 'inline' : 'none' }}
            >
              {listPlay ? <img src={images.back} width="20px" height="20px" /> : null }
            </button>
            <button
              className="button"
              // working on this line:
              disabled={(!listPlay && !editingTodo.description)}
              onClick={this.handlePlayPauseClick}
              style={{margin: "2px"}}
            >
              {isPlaying ?
                <img src={images.stop} width="20px" height="20px" />
                : <img src={images.play} width="20px" height="20px" />
              }
            </button>
            <button
              className="button"
              disabled={nowPlaying == null}
              onClick={this.props.advancePlayCounter}
              style={{ margin: "2px", display: listPlay ? 'inline' : 'none' }}
            >
              <img src={images.next} width="20px" height="20px" />
            </button>
          </div>
          <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
            <button
              className="button"
              disabled={!this.props.user}
              onClick={() => this.handleListPlayModeClick()}
              style={{margin: "2px", height: "18px", fontSize: "10px", padding: "1px 5px"}}
            >
              {listPlay ? 'Playing Todo-List' : 'Playing Todo-Editor'}
            </button>
          </div>
        </div>

        <div className="column is-4">
          <span>Playlist ({playlist[0] && playlist[0].username})</span>
          <div style={{
            display: 'flex', height: '65px', padding: '5px', background: '#aaa', borderRadius: '3px',
          }}>
            {playlist.map(todo => <div key={'Header-TagList'+todo._id}>{todo.title},&nbsp;</div>)}
          </div>
        </div>

        { user === false ? (
          <div
            className="column is-1"
            style={{display: "flex", justifyContent: "space-around", alignItems: 'flex-start'}}
          >
            <Link to={'/login'}> Login </Link>
            <Link to={'/register'}> Register </Link>
          </div>
        ) : (
          <div
            className="column is-1"
            style={{display: "flex", padding: '0',
              justifyContent: "space-around", alignItems: 'flex-start'}}
          >
            <div>
              <a onClick={() => {
                this.props.logoutUser()
                this.props.toggleListPlay(true)
              }}>Logout</a>
            </div>
          </div>
        )}

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
    listPlay: state.todos.listPlay,
    playlist: state.todos.playlist,
    editingTodo: state.todos.editingTodo,

    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  // fetchTodos,
  // addTodo,
  // updateTodo,
  // deleteTodo,
  playPause,
  toggleListPlay,
  logoutUser,
  advancePlayCounter,
  setEditingTodo,
  setNowPlaying,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

