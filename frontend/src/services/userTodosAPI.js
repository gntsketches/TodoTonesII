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


  // list({ query }) {
  //   return this.services.baseAPIv2.get('/admin/challenges/', false, {
  //     match: query,
  //   });
  // }


  createTodo(todoData, user) {
    // const {} = data;

    const data = {
      ...todoData,
      user_id: user._id,
    }
    return fetch(`${LOCALHOST_BASE_URL}/todos`, {
      method: 'POST',
      // headers : new Headers(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

  }

  /*
  function* saveTodo (action) {
    console.log('saveTodo saga', action)
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
  */


  /*
  archive(id) {
    return this.services.baseAPIv2.patch(`/admin/activity-types/${id}`);
  }

  get(id) {
    return this.services.baseAPIv2.get(
      `/admin/challenges/${id}`,
      false,
    );
  }

 */

}
