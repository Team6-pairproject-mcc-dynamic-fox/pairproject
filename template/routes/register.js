const router = require('express').Router()
const RegisterController = require('../controllers/registerController.js')

router.get('/', RegisterController.regist)
router.post('/', RegisterController.create)

module.exports = router