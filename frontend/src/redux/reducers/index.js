import { combineReducers } from 'redux'
import user, { USER_DEFAULT_STATE } from './user'
import todos, { TODOS_DEFAULT_STATE} from './todos'

const todoApp = combineReducers({
  user,
  todos
})

export const DEFAULT_STATE = {
  user: USER_DEFAULT_STATE,
  todos: TODOS_DEFAULT_STATE
}

export default todoApp
