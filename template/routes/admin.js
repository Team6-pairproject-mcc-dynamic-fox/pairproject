const router = require("express").Router()
const AdminController = require("../controllers/AdminController")

//routingan
router.get("/", AdminController) //login admin
router.get("/waitingList", AdminController) //tampil daftar suspect yg waiting list(table suspect)
router.get("/add-suspect/:id", AdminController)  //menjumlahkan jumlah suspect di rs dan sekaligus mendestroy data suspect dr waitinglist
module.exports = router