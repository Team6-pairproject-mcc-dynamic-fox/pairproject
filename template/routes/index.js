const router = require("express").Router()
const routerSuspect = require("./suspect")
const routerHospital = require("./hospital")
const register = require('./register')
const login = require('./login')

router.get('/', (req, res, next) => {
    res.render('homePage')
})
router.use("/suspects", routerSuspect)
router.use("/hospitals", routerHospital)
router.use('/register', register)
router.use('/login', login)

module.exports = router