import authAPI from './authAPI'
import userTodosAPI from "./userTodosAPI"

export default {
  authAPI: new authAPI(),
  userTodosAPI: new userTodosAPI(),
}