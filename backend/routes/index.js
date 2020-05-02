module.exports = (router) => {
  router.use('/auth', require('./authRoutes'))
  router.use('/todos', require('./todosRoutes'))
}
