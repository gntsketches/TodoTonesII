import React, { Component } from 'react'


class Header extends Component {
  render() {
    return (
      <section
        className="hero is-primary"
        style={{"minHeight": "15vh", "marginBottom": "5vh"}}
      >
        <div className="hero-body">
          <h1 className="title white level-item">Todo Tones II</h1>
        </div>
      </section>
    )
  }
}

export default Header
