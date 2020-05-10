const Router = require('koa-router')
const router = new Router()
const todosController = require('../controllers/todosController')

router.get('/', todosController.findAll)
router.get('/:id', todosController.userTodos)
router.post('/', todosController.create)
router.post('/:id', todosController.update)
router.delete('/:id', todosController.destroy)

module.exports = router.routes()
