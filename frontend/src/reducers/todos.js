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
  PLAY,
} from '../actions/todos'

import TodoModel from "../classes/TodoModel"

export const TODOS_DEFAULT_STATE = {
  loading: false,
  saving: false,
  error: '',
  items: [],
  editingTodo: { title: '', description: ''},
  nowPlaying: null,
  isPlaying: false,
}

export default function todos (state = TODOS_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_TODOS:
      return {...state, items: action.todos, loading: false}

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
      // console.log('action.todo', action.todo)
      return {
        ...state,
        editingTodo: action.todo,
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

    case PLAY:
      // console.log('action.todo', action.todo)
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }

    default:
      return state
  }
}
