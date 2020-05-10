import { LOCALHOST_BASE_URL } from '../config/env'
import {call, put} from "redux-saga/effects"
import {addTodoSuccess, todosFailure} from "../redux/actions/todos"


export default class userTodosAPI {
  // constructor(services) {
  //   this.services = services;
  //   services.afterLoad(() => {
  //    // after load
  // });
  // }


  fetchPublicUserTodos(username, tag='') {
    // console.log('api userId', userId)
    return fetch(`${LOCALHOST_BASE_URL}/todos/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }


  createTodo(todoData, userId) {
    const data = {
      ...todoData,
      user_id: userId,
    }
    console.log('api data', data)
    return fetch(`${LOCALHOST_BASE_URL}/todos`, {
      method: 'POST',
      // headers : new Headers(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  updateTodo(todoData, userId) {
    const data = {
      ...todoData,
      user_id: userId,
    }
    // console.log('apiUpdate data', data)
    return fetch(`${LOCALHOST_BASE_URL}/todos/${todoData._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  deleteTodo(todoId, userId) {
    console.log('delete todoId', todoId)
    return fetch(`${LOCALHOST_BASE_URL}/todos/${todoId}`, {
      method: 'DELETE',
    })
  }

  /*
  get(id) {
    return this.services.baseAPIv2.get(
      `/admin/challenges/${id}`,
      false,
    );
  }
  */

}
