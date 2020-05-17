import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

import { LOCALHOST_BASE_URL } from '../../config/env'
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  FETCH_TODOS,
  PLAY_PAUSE,
  loadedTodos,
  addTodo,
  addTodoSuccess,
  updateTodoSuccess,
  todosFailure,
  fetchTodos,
  setEditingTodo,
  setNowPlaying,
  playPause,
  advancePlayCounter,
} from '../actions/todos'

import history from '../../utils/history'
import store from "../store"
import AudioModule from "../../classes/AudioModule"
const audioModule = new AudioModule()


function* getAllTodos () {
  // console.log('in getAllTodos')
  try {
    // const res = yield call(fetch, 'todos')
    const res = yield call(fetch, `${LOCALHOST_BASE_URL}/todos`)
    const todos = yield res.json()
    yield put(loadedTodos(todos))

    // if (todos.length > 0) {
      // might not even need this...? eventually you'll use localstorage for editingTodo...
    //   yield put(setEditingTodo(todos[0]))
    // }
  } catch (e) {
    yield put(todosFailure(e.message))
  }
}

function* saveTodo (action) {
  // console.log('saveTodo saga', action)
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(action.todo),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }

    const res = yield call(fetch, `${LOCALHOST_BASE_URL}/todos`, options)
    const todo = yield res.json()
    yield put(addTodoSuccess(todo))
  } catch (e) {
    yield put(todosFailure(e.message))
  }
}

// should really be saveTodo
function* updateTodo (action) {
  // console.log('updateTodo action', action)


  try {
    const filterIdFromTodo = ({ title, description, createdAt }) => ({ title, description, createdAt })
    const bod = filterIdFromTodo(action.todo)

    const options = {
      method: 'POST',
      body: JSON.stringify(bod),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }


    const res = yield call(fetch, `${LOCALHOST_BASE_URL}/todos/${action.todo._id}`, options)
    const todo = yield res.json()
    // yield put(updateTodoSuccess(todo))
    // console.log('todo res', todo) // returns the value before update. hmm.

    yield put(fetchTodos());
  } catch (e) {
    // console.log('update todo failed', e)
    yield put(todosFailure(e.message))
  }
}

function* deleteTodo (action) {
  try {
    yield call(fetch, `${LOCALHOST_BASE_URL}/todos/${action.id}`, { method: 'DELETE' })
  } catch (e) {
    yield put(todosFailure(e.message))
  }
}

function* playPauseSaga(action) {
  console.log('play in sagas', action)
  audioModule.updateAudioStatus()

  // not necessary as audioModule reads state...
  // if (action.playPause === 'pause') {
  //   audioModule.stop()
  // } else {
  //   audioModule.changeAudio()
  // }

  // below, redux store reducer runs *before* this is called, causing the if to behave "backward"
  // const state = store.getState()
  // const { isPlaying } = state.todos
  // console.log('isPlaying', isPlaying)
  // if (isPlaying) {
  //   audioModule.stop()
  // } else {
  //   audioModule.start()
  // }
}

function* setPlaylist(action) {
  // SET_PLAY_COUNTER
  yield put(setNowPlaying(action.playlist[0]))
  yield put(playPause('play'))
}

function* advancePlaylist() {
  const state = store.getState()
  console.log('>>>playCounter in sagas', state.todos.playCounter)
  if (state.todos.playMode === 'Once' && state.todos.playCounter === 0) {
    yield put(playPause('pause'))
  }
  yield put(setNowPlaying(state.todos.playlist[state.todos.playCounter]))
}

function* loginUser(action) {
  history.push(`/users/${action.userData.username}`);
}

// RootSaga seems to take the place of the 'watcher' sagas
function* rootSaga() {
  yield takeLatest(FETCH_TODOS, getAllTodos)
  yield takeLatest(ADD_TODO, saveTodo)
  yield takeLatest(DELETE_TODO, deleteTodo)
  yield takeEvery(UPDATE_TODO, updateTodo)
  yield takeEvery(PLAY_PAUSE, playPauseSaga)
  yield takeEvery('SET_PLAYLIST', setPlaylist)
  yield takeEvery('LOGIN_USER', loginUser)
  yield takeEvery('ADVANCE_PLAY_COUNTER', advancePlaylist)

}

export default rootSaga;


