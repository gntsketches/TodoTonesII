const Todo = require('../models/Todo')

async function findAll (ctx) {
  console.log("todosController findAll")
  // Fetch all Todo's from the database and return as payload
  const todos = await Todo.find({})
  ctx.body = todos
}

async function create (ctx) {
  const { body } = ctx.request
  console.log("todosController create", body)
  // Create New Todo from payload sent and save to database
  const newTodo = new Todo(ctx.request.body)
  const savedTodo = await newTodo.save()
  ctx.body = savedTodo
}

async function destroy (ctx) {
  console.log("todosController destroy")
  // Get id from url parameters and find Todo in database
  const id = ctx.params.id
  const todo = await Todo.findById(id)

  // Delete todo from database and return deleted object as reference
  const deletedTodo = await todo.remove()
  ctx.body = deletedTodo
}

async function update (ctx) {
  console.log("todosController update")
  const id = ctx.params.id
  console.log('>>>id ', id)
  const { body } = ctx.request;
  console.log('>>>body ', body)

  try {
    const updateData = { ...body, createdAt: new Date() }
    const todo = await Todo.findByIdAndUpdate(id, updateData);
    ctx.body = todo
  } catch(e) {
    ctx.throw(e);
  }

  // const todo = await Todo.findById(id)
  // todo.done = !todo.done
  // // Update todo in database
  // const updatedTodo = await todo.save()
  // ctx.body = updatedTodo

  // const { body } = ctx.request;
  // try {
  //   const postData = { ...body, createdAt: new Date() }
  //   const post = await Post.findByIdAndUpdate(id, postData);
  //   ctx.redirect(`/post/${post.id}`);
  // } catch(e) {
  //   ctx.throw(e);
  // }
}

module.exports = {
  findAll,
  create,
  destroy,
  update
}
