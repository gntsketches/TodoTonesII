/* models/todo.js */
const mongoose = require('mongoose')

// Declare Schema
const TodoSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    // done: { type: Boolean },
    // test_default: { type: String, default: 'default applied'}
  },
  { timestamps: true }
);

// Declare Model to mongoose with Schema
const Todo = mongoose.model('Todo', TodoSchema)

// Export Model to be used in Node
module.exports = mongoose.model('Todo')
