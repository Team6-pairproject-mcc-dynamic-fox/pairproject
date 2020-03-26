const router = require("express").Router()
const SuspectController = require("../controllers/SuspectController")

//routingan

//buat daftar patient
router.get("/register", SuspectController)//dapat form
router.post("/register", SuspectController)//kirim form ke data base





module.exports = router