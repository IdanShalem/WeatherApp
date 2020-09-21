const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/WeatherDB', {useNewUrlParser: true})

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)

port = 3000
app.listen(process.env.PORT || PORT)