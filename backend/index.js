require('dotenv').config();

const Koa = require('koa')
const session = require('koa-session');
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
// const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const mongoose = require('mongoose');

const app = new Koa()
const router = new Router()

app.keys = ['secret key'];

// app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(session(app))
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.use(require('koa-static')('./build'))


// mongoose.connect(process.env.DATABASE)
mongoose.connect('mongodb://localhost/todotones', {useNewUrlParser: true})

mongoose.connection.once('open', function(){console.log('>>> MongoDB connected...')})
.on('error', function(error){
  console.log('>>> Connection error:', error);
});


const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API server started on ${port}`))
