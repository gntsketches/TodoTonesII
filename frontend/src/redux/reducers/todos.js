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
  editingTodo: { title: '', description: ''},
  nowPlaying: null,
  isPlaying: false,
  playlist: [],
  playCounter: 0,
  listPlay: false,
  listPlayMode: 'Once',
  playThroughList: true,
}

console.log('default state in reducer', TODOS_DEFAULT_STATE)


export default function todos (state = TODOS_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_TODOS:
      return {
        ...state,
        items: action.todos,
        loading: false,
        // playQueue: action.todos,
        // it's going to be more complicated than that
        // randomize, click repertoire, click unsaved,
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
      // maybe should just be doing this transform in the TodoEditor?
      //  ... why is the editingTodo state managed in Redux at all?
      //  maybe it's so you can click to set it?
      //  could be better to receive & transform values on mount/update...
      // console.log('action', action)
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
      // console.log('action.todo', action.todo)
      return {
        ...state,
        nowPlaying: {
          ...action.todo,
          model: new TodoModel(action.todo.description),
        },
      }

    case 'SET_PLAYLIST':
      const { playlist } = action
      // console.log('reducer.playlist', playlist)
      // if (state.playCounter > playlist.length) ...?
      return {
        ...state,
        playlist: action.playlist,
        playCounter: 0,
      }

    case PLAY_PAUSE:
      // action accepts play vs pause, but this doesn't use it...
      console.log('playPause', action.playPause)
      let playing
      if (action.playPause == null) playing = !state.isPlaying
      else playing = action.playPause === 'play'
      return {
        ...state,
        isPlaying: playing,
      }

    case 'TOGGLE_PLAY_THROUGH_LIST':
      return {
        state,
        playThroughList: !state.playThroughList,
      }

    case 'ADVANCE_PLAY_COUNTER':
      let count
      if (state.playMode === 'Rand') {
        count = Math.floor(Math.random() * state.playlist.length)
      } else {
        if (action.back) {
          // this probs a problem in 'Once' mode
          count = state.playCounter === 0 ? state.playlist.length-1 : state.playCounter-1
        } else {
          count = state.playCounter >= state.playlist.length-1 ? 0 : state.playCounter+1
        }
      }

      return {
        ...state,
        playCounter: count,
      }

    case 'CHANGE_LIST_PLAY_MODE':
      // console.log('reducer state', state)
      const { listPlayMode } = state

      let newPlayMode
      if (listPlayMode === 'Loop') newPlayMode = 'Rand'
      else if (listPlayMode === 'Rand') newPlayMode = 'Once'
      else if (listPlayMode === 'Once') newPlayMode = 'Loop'

      return {
        ...state,
        listPlayMode: newPlayMode,
      }

    case 'TOGGLE_LIST_PLAY':
      console.log('reducer action.bool', action.bool)
      console.log('reducer action.bool == null', action.bool == null)
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

