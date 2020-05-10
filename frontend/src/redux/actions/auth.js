
export function loginUser(userData) {
  return { type: 'LOGIN_USER', userData}
}

export function logoutUser() {
  return { type: 'LOGOUT_USER'}
}

// export default {
//   loginUser(userData) {
//     return {type: 'LOGIN_USER', userData}
//   },
// }
