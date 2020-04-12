import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import { connect } from 'react-redux'

import TodoModel from "../classes/TodoModel"
import { addTodo, toggleTodo, deleteTodo, fetchTodos } from '../actions/todos';

const Todo = ({ todo, id, onDelete, onToggle }) => (
  <div className="box todo-item level is-mobile">
    <div className="level-left">
      <label className={`level-item todo-description ${todo.done && 'completed'}`}>
        <input className="checkbox" type="checkbox" checked={todo.done} onChange={onToggle}/>
        <span>{todo.description}</span>
      </label>
    </div>
    <div className="level-right">
      <a className="delete level-item" onClick={onDelete}>Delete</a>
    </div>
  </div>
)

class Todos extends Component {
  state = { newTodo: '' }

  componentDidMount() {
    this.props.fetchTodos()
  }

  addTodo (event) {
    event.preventDefault() // Prevent form from reloading page
    const { newTodo } = this.state

    if(newTodo) {
      const todo = { description: newTodo, done: false }
      this.props.addTodo(todo)
      this.setState({ newTodo: '' })
    }
  }

  render() {
    let { newTodo } = this.state
    const { todos, isLoading, isSaving, error, deleteTodo, toggleTodo } = this.props

    return (
      <section className="column is-6">
        <div className="error">{error}</div>

        <form className="form" onSubmit={this.addTodo.bind(this)}>
          <div className="field has-addons" style={{ justifyContent: 'center' }}>
            <div className="control">
              <input className="input"
                     value={newTodo}
                     placeholder="New todo"
                     onChange={(e) => this.setState({ newTodo: e.target.value })}/>
            </div>

            <div className="control">
              <button className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
                      disabled={isLoading || isSaving}>Add</button>
            </div>
          </div>
        </form>

        <div className="container todo-list">
          {todos.map((todo) => <Todo key={todo._id}
                                     id={todo._id}
                                     todo={todo}
                                     onDelete={() => deleteTodo(todo._id)}
                                     onToggle={() => toggleTodo(todo._id)}/> )}
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
