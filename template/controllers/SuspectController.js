const models = require("../models/index") //buat model

class SuspectController {
    static read(req, res) {
        let SuspectId = req.session.SuspectId
        models.Hospital.findAll({include : {model: models.Suspect}, through: {model: models.HospitalReference}})
        .then(result => {
            let arr = []
            for (let i = 0; i < result.length; i++) {
                let status = true;
                for (let j = 0; j < result[i].Suspects.length; j++) {
                    if (result[i].Suspects[j].id == SuspectId) {
                        status = false;
                    }
                }
                if (status == true) {
                    arr.push(result[i])
                }
            }
            const message = req.session.message || ''
            delete req.session.message
            res.render('suspectHospital', {arr, message})
        })
        .catch(err => {
            res.send(err)
        })
    }

    
    static create(req, res) {
        let param = req.params.id
        let SuspectId = req.session.SuspectId
        models.HospitalReference.create({HospitalId: param, SuspectId: SuspectId})
        .then(result => {
            res.redirect('/suspects')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = SuspectController