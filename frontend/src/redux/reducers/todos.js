import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  TODOS_FAILURE,
  UPDATE_TODO,
  DELETE_TODO,
  LOADED_TODOS,
  FETCH_TODOS,
  SET_EDITING_TODO,
  SET_NOW_PLAYING,
  PLAY_PAUSE,
} from '../actions/todos'

import TodoModel from "../../classes/TodoModel"

export const TODOS_DEFAULT_STATE = {
  loading: false,
  saving: false,
  error: '',
  items: [],
  editingTodo: { title: '', description: '', tags: ''},  // should reference constants!
  nowPlaying: null,
  isPlaying: false,
  playlist: [],
  playCounter: 0,
  listPlay: true,
  listPlayMode: 'Stay',
}

// console.log('default state in reducer', TODOS_DEFAULT_STATE)


export default function todos (state = TODOS_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_TODOS:
      return {
        ...state,
        items: action.todos,
        loading: false,
      }

    case FETCH_TODOS: {
      return {...state, loading: true}
    }

    case ADD_TODO:
      return {...state, saving: true}

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.todo),
        saving: false
      }

    case TODOS_FAILURE:
      return {...state, loading: false, saving: false, error: action.error}

    case UPDATE_TODO:
      return {
        ...state,
        // items: state.items.map((todo) =>
        //   todo._id === action.id ? {...todo, done: !todo.done} : todo
        // )
      }

    case DELETE_TODO:
      return {
        ...state,
        items: state.items.reduce((items, todo) =>
          todo._id !== action.id ? items.concat(todo) : items, []
        )
      }

    case SET_EDITING_TODO:
      // editingTodo is managed in Redux for persist
      // maybe should just be doing this transform in the TodoEditor?
      // console.log('reducers setEditingTodo', action)
      const { todo } = action
      // console.log('todoPre', todo)
      let tags = todo.tags
      if (Array.isArray(tags)) {
        tags = tags.join(', ')
      }
      // console.log('todoPost', todo)
      return {
        ...state,
        editingTodo: { ...todo, tags }
      }

    case SET_NOW_PLAYING:
      // console.log('reducer setNowPlaying', action.todo)
      const newNowPlaying = action.todo == null ?
        null : { ...action.todo, model: new TodoModel(action.todo.description),
      }

      return {
        ...state,
        nowPlaying: newNowPlaying,
      }

    case 'SET_PLAYLIST':
      const { playlist } = action
      console.log('reducer setPlaylist', playlist)
      return {
        ...state,
        playlist: action.playlist,
      }

    case PLAY_PAUSE:
      // console.log('reducer playPause', action.playPause)
      let playing
      if (action.playPause == null) playing = !state.isPlaying
      else playing = action.playPause === 'play'

      return {
        ...state,
        isPlaying: playing,
      }

    case 'ADVANCE_PLAY_COUNTER':
      // console.log('reducers advancePlayCounter', action.payload)
      let count
      if (state.listPlayMode === 'Rand') {
        count = Math.floor(Math.random() * state.playlist.length)
      } else if (typeof action.payload === 'number') {
        count = action.payload
      } else if (action.payload === 'back') {
        const nowPlayingIndex = state.playlist.findIndex(todo => todo._id === state.nowPlaying._id)
        if (nowPlayingIndex === -1) {
          count = 0
        } else {
          count = nowPlayingIndex === 0 ? state.playlist.length-1 : nowPlayingIndex-1
        }
      } else {
        const nowPlayingIndex = state.playlist.findIndex(todo => todo._id === state.nowPlaying._id)
        if (nowPlayingIndex === -1) {
          count = 0
        } else {
          count = nowPlayingIndex >= state.playlist.length-1 ? 0 : nowPlayingIndex+1
        }
      }

      return {
        ...state,
        playCounter: count,
      }

    case 'CHANGE_LIST_PLAY_MODE':
      // console.log('reducer changeListPlayMode', state)
      const { listPlayMode } = state

      let newPlayMode
      if (listPlayMode === 'Stay') newPlayMode = 'Loop'
      else if (listPlayMode === 'Loop') newPlayMode = 'Once'
      else if (listPlayMode === 'Once') newPlayMode = 'Rand'
      else if (listPlayMode === 'Rand') newPlayMode = 'Stay'

      return {
        ...state,
        listPlayMode: newPlayMode,
      }

    case 'TOGGLE_LIST_PLAY':
      // console.log('reducer togglePlayList', action.bool)
      let newListPlay
      if (action.bool == null) newListPlay = !state.listPlay
      else newListPlay = action.bool
      return {
        ...state,
        listPlay: newListPlay,
      }

    default:
      return state
  }
}

