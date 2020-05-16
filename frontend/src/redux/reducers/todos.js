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
  playThroughList: true,
  loopPlay: false,
}



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
      console.log('reducer.playlist', playlist)
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

    case 'TOGGLE_LOOP_PLAY':
      return {
        state,
        loopPlay: !state.loopPlay,
      }

    case 'ADVANCE_PLAY_COUNTER':
      const count = state.playCounter >= state.items.length-1 ? 0 : state.playCounter+1
      return {
        ...state,
        playCounter: count,
      }

    default:
      return state
  }
}

