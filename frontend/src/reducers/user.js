import {REGISTER_USER_SUCCESS} from "../actions/todos"

export const USER_DEFAULT_STATE = {
  loggedIn: false,
}

export default function user (state = USER_DEFAULT_STATE, action) {
  console.log('in user reducer')
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      }

    default:
      return state
  }
}
