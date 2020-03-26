const router = require('express').Router()
const LoginController = require('../controllers/LoginController.js')

router.get('/', LoginController.regist)
router.post('/', LoginController.create)

module.exports = router