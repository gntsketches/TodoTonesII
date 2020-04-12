import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import { connect } from 'react-redux'

import TodoModel from "../classes/TodoModel"
import { addTodo, toggleTodo, deleteTodo, fetchTodos } from '../actions/todos';



class Todos extends Component {
  state = {
    newTodoTitle: '',
    newTodo: ''
  }

  componentDidMount() {
    this.props.fetchTodos()
  }

  addTodo = event => {
    console.log('in add')
    // event.preventDefault() // Prevent form from reloading page
    const { newTodoTitle, newTodo } = this.state

    if(newTodo) {
      const todo = { title: newTodoTitle, description: newTodo}
      this.props.addTodo(todo)
      this.setState({
        newTodoTitle: '',
        newTodo: ''
      })
    }
  }

  render() {
    let { newTodoTitle, newTodo } = this.state
    const { todos, isLoading, isSaving, error, deleteTodo, toggleTodo } = this.props

    return (
      <section className="column is-6">

        <div className="error">{error}</div>

        {/*<form className="form" onSubmit={this.addTodo.bind(this)}>*/}
          <div className="level field has-addons" style={{ justifyContent: 'center' }}>

            <div className="control">
              <button className="control button">Play</button>
            </div>

            <div className="control">
              <input className="input"
                     value={newTodoTitle}
                     placeholder="title..."
                     onChange={(e) => this.setState({ newTodoTitle: e.target.value })}/>
            </div>

            <div className="control">
              <button
                className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
                disabled={isLoading || isSaving}
                // onSubmit={this.addTodo}
                onClick={this.addTodo}
              >
                Add
              </button>
            </div>

          </div>
        {/*</form>*/}

        <div className="level field has-addons" style={{ justifyContent: 'center' }}>
          <div className="control">
          <textarea
            className="level-item"
            value={newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
            rows="10"
            cols="75"
          />
          </div>
          <div className="control">
            <button className="delete">Delete</button >
          </div>
        </div>


      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    isLoading: state.todos.loading,
    isSaving: state.todos.saving,
    error: state.todos.error
  }
}

const mapDispatchToProps = {
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)



/*

<li id = "1">
  <button className="play">Play</button>
  <span
    contentEditable="true"
    className="editable"
    spellCheck="false"
  >
    loC3 < C D E F > hiC5
    t30 % 85 n1.01 pt30 wt10
    { tri sin squ saw mono p0 .1 } [a0.02 d0.01 s0.75 r3]
  </span>
  <button className="delete">Delete</button >
< /li>

*/



// // Create nodes
// todos.forEach(todo => {
//   const li = this.createElement('li')
//   li.id = todo.id
//
//   const span = this.createElement('span')
//   span.contentEditable = true
//   span.classList.add('editable')
//   span.textContent = todo.text
//   span.setAttribute('spellcheck', false)
//
//   const playButton = this.createElement('button', 'play')
//   playButton.textContent = todo.playing ? 'Stop' : 'Play'
//   if (todo.playing) { playButton.classList.add('active') }
//   else { playButton.classList.remove('active')}
//
//   const deleteButton = this.createElement('button', 'delete')
//   deleteButton.textContent = 'Delete'
//
//   // Append nodes
//   li.append(playButton, span, deleteButton)
//   this.todoList.append(li)
// })
