import React, {Component} from 'react'
import {connect} from "react-redux"
import services from '../services'

import { loginUser } from "../redux/actions/user"


class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    // console.log('loggedIn: ', this.props.loggedIn)
    // if (this.props.loggedIn) {
    // }
  }

  onLoginSubmit = async e => {
    const { username, password } = this.state;
    e.preventDefault()

    const data = { username, password }

    services.authAPI.loginUser(data)
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data)
      this.props.loginUser(data)
    })
    .catch((err) => console.log(err))
  }


  render() {
    const { username, email, password } = this.state;

    return (
      <div className="columns">
        <div className="column is-6">
          <h1 className="title">Register</h1>

          {/*<form action="http://localhost:4000/auth/register" method="POST">*/}
          <form onSubmit={this.onLoginSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <span>(Username-or-email, eventually)</span>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="my-username"
                  name="username"
                  value={username}
                  onChange={(e)=>{this.setState({username: e.target.value})}}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=>{this.setState({password: e.target.value})}}
                />
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
  return {
    // loggedIn: state.user.loggedIn,
  }
}

const mapDispatchToProps = {
  loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

