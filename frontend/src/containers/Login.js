import React, {Component} from 'react'
import {connect} from "react-redux"


class Login extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <h1 className="title">Register</h1>

          <form action="/auth/register" method="POST">
          {/*<form>*/}
            <div className="field">
              <label className="label">Full Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="e.g Alex Smith" name="fullName" />
              </div>
            </div>

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
              <button className="button is-primary">Submit</button>
            </div>
          </form>
        </div>

        <div className="column">
          <h1 className="title">Login</h1>

          <form action="/auth/login" method="POST">
          {/*<form>*/}
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
              <button className="button is-primary">Submit</button>
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

