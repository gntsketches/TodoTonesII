const mongo = require('mongodb')
const { ObjectID } = mongo
const Todo = require('../models/Todo')
const User = require('../models/User')

async function findAll (ctx) {
  // console.log("todosController findAll")
  // Fetch all Todo's from the database and return as payload
  const todos = await Todo.find({})
  ctx.body = todos
}

async function userTodos (ctx) {
  const username = ctx.params.id
  // console.log("todosController userTodos", username)
  const user = await User.findOne({username})
  // console.log('user', user)
  const id = user._id
  // console.log('id', id)
  let todos = await Todo.find({user_id: ObjectID(id)})
  console.log('>>>>> todos: ', todos)
  const mappedTodos = todos.map(todo => {
    return {
      ...todo._doc,
      username: username
    }
  })
  console.log('>>>>> mappedTodos: ', mappedTodos)
  ctx.body = mappedTodos
}

async function create (ctx) {
  const { body } = ctx.request
  const user_id = ObjectID(body.user_id)

  const tagString = body.tags
  const sanitized = tagString.replace(/[^a-zA-Z0-9 ]/g, ' ');
  const tagArrPre = sanitized.split(' ')
  const tagArr = tagArrPre.filter(str =>  str !== '' )
  // remove duplicates!


  const todoInfo = {
    ...body,
    user_id,
    tags: tagArr,
  }
  const newTodo = new Todo(todoInfo)
  const savedTodo = await newTodo.save()
  ctx.body = savedTodo
}

async function update (ctx) {
  // console.log("todosController update")
  const id = ctx.params.id
  // console.log('>>>id ', id)
  const { body } = ctx.request;
  // console.log('>>>body ', body)

  const tagString = body.tags
  const sanitized = tagString.replace(/[^a-zA-Z0-9 ]/g, ' ');
  const tagArrPre = sanitized.split(' ')
  const tagArr = tagArrPre.filter(str =>  str !== '' )
  // remove duplicates!

  try {
    const updateData = {
      ...body,
      tags: tagArr,
      //, createdAt: new Date() }
    }
    const todo = await Todo.findByIdAndUpdate(id, updateData, {new: true});
    ctx.body = todo
  } catch(e) {
    // console.log('>>> update error!!!')
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
  //   ctx.redirevt(`/post/${post.id}`);
  // } catch(e) {
  //   ctx.throw(e);
  // }
}

async function destroy (ctx) {
  // console.log("todosController destroy")
  // Get id from url parameters and find Todo in database
  const id = ctx.params.id
  const todo = await Todo.findById(id)

  // Delete todo from database and return deleted object as reference
  const deletedTodo = await todo.remove()
  ctx.body = deletedTodo
}


module.exports = {
  findAll,
  userTodos,
  create,
  destroy,
  update
}



/*
// Build query Atlas example
const q = this.Challenge
.find({ name: re })
.sort({ updated_at: -1 })
.populate('currency_id')
.populate('partner_ids');

const data = (await q).map(e => challengeAdminPayload({ challenge: e }));

return ctx.ok({
  data,
  meta: {
    total: data.length,
  },
});

 */
