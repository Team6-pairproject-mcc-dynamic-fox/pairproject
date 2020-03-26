const router = require("express").Router()
const SuspectController = require("../controllers/SuspectController")

//routingan

//buat daftar patient
router.get("/", SuspectController.read)//dapat form
router.get("/choosehospital/:id", SuspectController.create)






module.exports = router