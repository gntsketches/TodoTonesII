export const USER_DEFAULT_STATE = {
  user: false,
}

export default function user (state = USER_DEFAULT_STATE, action) {
  console.log('in user reducer')
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.userData,
      }

    case 'LOGOUT_USER':
      return {
        state,
        user: false,
      }

    default:
      return state
  }
}
