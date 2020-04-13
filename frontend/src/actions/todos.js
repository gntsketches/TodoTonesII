// action types
export const FETCH_TODOS = 'FETCH_TODOS'
export const LOADED_TODOS = 'LOADED_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const UPDATE_TODO = 'UPDATE_TODO'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export const DELETE_TODO = 'DELETE_TODO'
export const TODOS_FAILURE = 'TODOS_FAILURE'
export const SET_EDITING_TODO = 'SET_EDITING_TODO'


// action creators
export function fetchTodos() {
  return { type: FETCH_TODOS }
}

export function loadedTodos(todos) {
  return { type: LOADED_TODOS, todos }
}

export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}

export function addTodoSuccess(todo) {
  return { type: ADD_TODO_SUCCESS, todo }
}

export function updateTodo(todo) {
  return { type: UPDATE_TODO, todo }
}

export function updateTodoSuccess(todo) {
  return { type: ADD_TODO_SUCCESS, todo }
}

export function deleteTodo(id) {
  console.log('delete action')
  return { type: DELETE_TODO, id }
}

export function todosFailure(error) {
  return { type: TODOS_FAILURE, error }
}

export function setEditingTodo(todo) {
  console.log('set edit action')
  return { type: SET_EDITING_TODO, todo}
}

// export function updateEditingTodo(todo) {
//   return { type: UPDATE__EDITING_TODO, todo }
// }

