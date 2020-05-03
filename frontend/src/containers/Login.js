import React, {Component} from 'react'
import {connect} from "react-redux"


class Login extends Component {

  componentDidMount() {
  }

  async onRegisterSubmit(e) {
    e.preventDefault()
    console.log('register event', e.target.fullName.value)

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const data = {
      fullName: 'test1', email: 'email@email.co', password: 'pass1'
    }

    const response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    console.log('res', response); // parses JSON response into native JavaScript objects
  }

  onLoginSubmit(e) {
    e.preventDefault()
    console.log('login event', e.target.email.value)
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <h1 className="title">Register</h1>

          {/*<form action="http://localhost:4000/auth/register" method="POST">*/}
          <form onSubmit={this.onRegisterSubmit}>
            <div className="field">
              <label className="label">Full Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="e.g Alex Smith" name="fullName" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                {/*<input className="input" type="email" placeholder="e.g. alexsmith@gmail.com" name="email" />*/}
                <input className="input" placeholder="e.g. alexsmith@gmail.com" name="email" />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" name="password" />
              </div>
            </div>

            <div className="control">
              <button type="submit" className="button is-primary">Submit</button>
            </div>
          </form>
        </div>

        <div className="column">
          <h1 className="title">Login</h1>

          <form onSubmit={this.onLoginSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" placeholder="e.g. alexsmith@gmail.com" name="email" />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" name="password" />
              </div>
            </div>

            <div className="control">
              <button type="submit" className="button is-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

