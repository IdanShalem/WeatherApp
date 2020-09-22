const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require("mongoose")

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/WeatherDB')

port = 3000
app.listen(process.env.PORT || port, function(){
  console.log(`Server is up and running on port: ${port}`)
})