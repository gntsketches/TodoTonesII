const Router = require('koa-router')
const router = new Router()
const authController = require('../controllers/authController')

// .get('/', guest(), authController.index)
router.get('/', authController.index)
router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/logout', authController.logout);

module.exports = router.routes()
