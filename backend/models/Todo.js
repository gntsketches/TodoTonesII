/* models/todo.js */
const mongoose = require('mongoose')

// Declare Schema
const TodoSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    user_id: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    done: { type: Boolean },  // Ha! How to make them done?
  },
  { timestamps: true }
);

// Declare Model to mongoose with Schema
const Todo = mongoose.model('Todo', TodoSchema)

// Export Model to be used in Node
module.exports = mongoose.model('Todo')
