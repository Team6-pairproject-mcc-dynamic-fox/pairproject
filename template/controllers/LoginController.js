const models = require('../models')
const bcrypt = require('bcrypt');
const Op = require('sequelize').Op

class LoginController {
    static regist(req, res) {
        const message = req.session.message || ''
        delete req.session.message
        res.render('loginform', {message})
    }

    static create(req, res) {
        const {email, password, city} = req.body
            if(email.includes('adm')) {
                models.Admin.findOne({where : {[Op.and]:[{email: email},{password: password}]}})
                .then(result => {
                    if (result) {
                        // req.session.message = 'you have already register'
                        res.redirect('/hospitals')
                    } else {
                        req.session.message = 'your password/email is wrong'
                        res.redirect('/login')
                    }
                })
                .catch(err => {
                    res.send(err)
                })
            } else {
                models.Suspect.findOne({where : {[Op.and]:[{email: email},{password: password}]}})
                .then(result => {
                    if (result) {
                        // req.session.message = 'you have already register'
                        req.session.SuspectId = result.id
                        res.redirect('/suspects')
                    } else {
                        req.session.message = 'your password/email is wrong'
                        res.redirect('/login')
                    }
                })
                .catch(err => {
                    res.send(err)
                })
            }
    }
}

module.exports = LoginController