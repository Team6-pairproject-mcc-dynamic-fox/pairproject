const models = require('../models')
let bcrypt = require('bcrypt');

class RegisterController {
    static regist(req, res) {
        const message = req.session.message || ''
        delete req.session.message
        res.render('registerform', {message})
    }

    static create(req, res) {
        const {name, email, password, rePassword, city} = req.body
        if (password == rePassword) {
            if(email.includes('adm')) {
                models.Admin.findOne({where : {email: email}})
                .then(result => {
                    if (result) {
                        req.session.message = 'you have already register'
                        res.redirect('/hospitals')
                    } else {
                        console.log("aaa")
                        let bcrypt = require('bcrypt');
                        bcrypt.gensalt(10, function(err, salt) {
                            bcrypt.hash(password, salt, function(err, hash) {
                                let newData = {name, email, password: hash, city}
                                console.log("bbb")
                                models.Admin.create(newData)
                                .then(result => {
                                    console.log(result)
                                    res.send(result)
                                    res.redirect('/hospitals')
                                })
                            })
                        })
                    }
                })
                // let newData = {name, email, password, city}
                // models.Admin.create(newData)
                // .then(result => {
                //     console.log(result)
                //     res.redirect('/hospitals')
                // })
   
                .catch(err => {
                    res.send(err)
                })
            } else {
                models.Suspect.findOne({where : {email: email}})
                .then(result => {
                    if (result) {
                        res.session.message = 'you have already register'
                        res.redirect('/login')
                    } else {
                        let newData = {name, email, password, city}
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