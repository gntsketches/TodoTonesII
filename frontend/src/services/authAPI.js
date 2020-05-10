import { LOCALHOST_BASE_URL } from '../config/env'


export default class authAPI {
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


  registerUser(data) {
    // const {} = data;

    return fetch(`${LOCALHOST_BASE_URL}/auth/register`, {
      method: 'POST',
      // headers : new Headers(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

  }

  loginUser(data) {
    // const {} = data;

    return fetch(`${LOCALHOST_BASE_URL}/auth/login`, {
      method: 'POST',
      // headers : new Headers(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

  }

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
