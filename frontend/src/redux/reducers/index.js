import { combineReducers } from 'redux'
import auth, { USER_DEFAULT_STATE } from './auth'
import todos, { TODOS_DEFAULT_STATE} from './todos'

const todoApp = combineReducers({
  auth,
  todos
})

export const DEFAULT_STATE = {
  user: USER_DEFAULT_STATE,
  todos: TODOS_DEFAULT_STATE
}

export default todoApp
