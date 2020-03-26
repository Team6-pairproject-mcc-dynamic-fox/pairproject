const models = require('../models')
const bcrypt = require('bcrypt');

class RegisterController {
    static regist(req, res) {
        const message = req.session.message || ''
        delete req.session.message
        res.render('registerform', {message})
    }

    static create(req, res) {
        const {first_name, last_name, email, password, rePassword, city} = req.body
        if (password == rePassword) {
            if(email.includes('adm')) {
                models.Admin.findOne({where : {email: email}})
                .then(result => {
                    if (result) {
                        req.session.message = 'you have already register'
                        res.redirect('/hospitals')
                    } else {
                        models.Admin.findOne({where : {email: email}})
                        .then(result => {
                            if (result) {
                                req.session.message = 'you have already register'
                                res.redirect('/login')
                            } else {
                                const newData = {first_name, last_name, email, password, city}
                                models.Admin.create(newData)
                                .then(result => {
                                    console.log(result)
                                    res.redirect('/login')
                                })
                                .catch(err => {
                                    res.send(err)
                                })
                            }
                        })
                        .catch(err => {
                            res.send(err)
                        })
                    }
                })
                .catch(err => {
                    res.send(err)
                })
            } else {
                models.Suspect.findOne({where : {email: email}})
                .then(result => {
                    if (result) {
                        req.session.message = 'you have already register'
                        res.redirect('/login')
                    } else {
                        let newData = {first_name, last_name, email, password, city}
                        models.Suspect.create(newData)
                        res.redirect('/login')
                    }
                })
                .catch(err => {
                    res.send(err)
                })
            }
        } else {
            req.session.message = 'your password must same with confirm Password'
            res.redirect('/register')
        }
    }
}

module.exports = RegisterController