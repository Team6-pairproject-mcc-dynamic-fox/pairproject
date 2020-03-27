const models = require("../models/index")
const Op = require('sequelize').Op
const sequelize = require('sequelize')
const nodemailer = require('nodemailer');
const calculate = require('../helper/calculate.js')

class HospitalController {
    static read(req, res) {
        models.Hospital.findAll({order: [['id','ASC']]})
        .then(result => {
            const message = req.session.message || ''
            delete req.session.message
            res.render('hospital', {result, message})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static add(req, res) {
        let nameId;
        let nameTarget;
        let emailTarget;
        let hospitalId = req.params.id
        let suspect_quota;
        let link = []
        models.Hospital.findByPk(hospitalId)
        .then(result => {
            suspect_quota = result.suspect_quota
            let suspect_total = result.suspect_total
            let calculated = calculate(suspect_total, 1, true)
            return models.Hospital.update({suspect_total:calculated}, {where: {id: hospitalId}})
        })
        .then(result => {
            return models.Hospital.findAll({where: {suspect_total: {[Op.lt]: suspect_quota}}})
        })
        .then(result => {
            for(let i = 0; i < result.length; i++) {
                link.push(result[i].link_map)
            }
            return models.Suspect.findAll({
                attributes: [[sequelize.fn('min', sequelize.col('createdAt')), 'minDate']],
                raw: true,
              });
        })
        .then(result => {
            let date = result[0].minDate
            return models.Suspect.findOne({where: {createdAt : date}})
        })
        .then(result => {
            nameId = result.id
            nameTarget = result.fullName
            emailTarget = result.email
            let arr = []
            for (let i = 0; i < link.length; i++) {
                arr.push(`<p>Opsi ke-${i+1}</p><a href="${link[i]}">Klik Disini</a><br><br>`)
            }
            let address = arr.join('\n')
            console.log(address)
            const output = `
            <h3>Contact Details</h3>
            <ul>  
              <li>Name: ${nameTarget}</li>
              <li>Email: ${emailTarget}</li>
            </ul>
        
            <p>Hi, ${nameTarget}</p>
            <h4>Ada Slot Kosong Nih,</h4>
            ${address}
            <h5>Buruan registrasi ke Rumah Sakit yang bersangkutan yaa</h5>
            <h5>Batas Maksimal hanya 5 hari</h5>
            <h3>Semoga Cepat Sembuh Ya!</h3>
          `;
        
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pairprojectMCC4@gmail.com', // generated ethereal user
                pass: 'pairprojectmcc4fox'  // generated ethereal password
            }
          });
        
          // setup email data with unicode symbols
          let mailOptions = {
              from: 'pairprojectMCC4@gmail.com', // sender address
              to: emailTarget, // list of receivers
              subject: 'Node Contact Request', // Subject line
              text: 'Hello world?', // plain text body
              html: output // html body
          };
        
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);   
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          });
          req.session.message = `Email has been sent to ${nameTarget}`
          res.redirect('/hospitals');
        // return models.Suspect.destroy({where: {id: nameId}})
        // })
        // .then(result => {
        //     req.session.message = `Email has been sent to ${nameTarget}`
        //     res.redirect('/hospitals');
        })
        .catch(err => {
            res.send(err)
        })
    }

    static remove(req, res) {
        let nameId;
        let nameTarget;
        let emailTarget;
        let hospitalId = req.params.id
        let suspect_quota;
        let link = []
        models.Hospital.findByPk(hospitalId)
        .then(result => {
            suspect_quota = result.suspect_quota
            let suspect_total = result.suspect_total
            let calculated = calculate(suspect_total, 1, false)
            return models.Hospital.update({suspect_total:calculated}, {where: {id: hospitalId}})
        })
        .then(result => {
            return models.Hospital.findAll({where: {suspect_total: {[Op.lt]: suspect_quota}}})
        })
        .then(result => {
            for(let i = 0; i < result.length; i++) {
                link.push(result[i].link_map)
            }
            return models.Suspect.findAll({
                attributes: [[sequelize.fn('min', sequelize.col('createdAt')), 'minDate']],
                raw: true,
              });
        })
        .then(result => {
            let date = result[0].minDate
            return models.Suspect.findOne({where: {createdAt : date}})
        })
        .then(result => {
            nameId = result.id
            nameTarget = result.fullName
            emailTarget = result.email
            let arr = []
            for (let i = 0; i < link.length; i++) {
                arr.push(`<p>Opsi ke-${i+1}</p><a href="${link[i]}">Klik Disini</a><br><br>`)
            }
            let address = arr.join('\n')
            console.log(address)
            const output = `
            <h3>Contact Details</h3>
            <ul>  
              <li>Name: ${nameTarget}</li>
              <li>Email: ${emailTarget}</li>
            </ul>
        
    
            <p>Hi, ${nameTarget}</p>
            <h4>Ada Slot Kosong Nih,</h4>
            ${address}
            <h5>Buruan registrasi ke Rumah Sakit yang bersangkutan yaa</h5>
            <h5>Batas Maksimal hanya 5 hari</h5>
            <h3>Semoga Cepat Sembuh Ya!</h3>
          `;
        
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pairprojectMCC4@gmail.com', // generated ethereal user
                pass: 'pairprojectmcc4fox'  // generated ethereal password
            }
          });
        
          // setup email data with unicode symbols
          let mailOptions = {
              from: 'pairprojectMCC4@gmail.com', // sender address
              to: emailTarget, // list of receivers
              subject: 'Node Contact Request', // Subject line
              text: 'Hello world?', // plain text body
              html: output // html body
          };
        
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);   
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          });
          req.session.message = `Email has been sent to ${nameTarget}`
          res.redirect('/hospitals');
        // return models.Suspect.destroy({where: {id: nameId}})
        // })
        // .then(result => {
        //     req.session.message = `Email has been sent to ${nameTarget}`
        //     res.redirect('/hospitals');
        })
        .catch(err => {
            res.send(err)
        })
    }

    static readwl (req, res) {
        let param = req.params.id
        models.Hospital.findByPk(param, {include : {model: models.Suspect}, through: {model: models.HospitalReference}})
        .then(result => {

            let name = result.name
            let waitinglist = result.Suspects
            res.render('waitinglist', {waitinglist, name})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = HospitalController

