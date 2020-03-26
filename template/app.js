const express = require("express")
const app = express()
const PORT = 3000
const router = require("./routes/index")
const session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use("/", router)


app.set('trust proxy', 1) // trust first proxy


app.listen(PORT, () => console.log(`port: ${PORT}`))