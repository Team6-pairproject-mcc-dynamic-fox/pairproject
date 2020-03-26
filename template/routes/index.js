const router = require("express").Router()
const routerSuspect = require("./suspect")
const routerAdmin = require("./admin")
const routerHospital = require("./hospital")

router.use("/suspects", routerSuspect)
router.use("/admin", routerAdmin)
router.use("/hospitals", routerHospital)

module.exports = router