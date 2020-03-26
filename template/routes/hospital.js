const router = require("express").Router()
const HospitalController = require("../controllers/HospitalController")

//routingan
router.get("/", HospitalController.read)//tampil daftar rs di indonesia
router.get('/:id/addPatient', HospitalController.add)
router.get('/:id/removePatient', HospitalController.remove)
router.get('/:id/waitinglist', HospitalController.readwl)


module.exports = router