const express = require('express')
const router = express.Router()
const urllib = require('urllib')

const City = require('../model/City')

const apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='
const metricUnits = 'units=metric'
const apiKey = 'appid=516eda5415931599ef12e92f4733ebf9'


router.get('/defaultCity', function(req, res) {
    urllib.request(`${units=metric}tel-aviv&${metricUnits}&${apiKey}`, function(err, weather) {
        const defaultCity = new City({
            name: weather.name,
            temperature: weather.main.temp,
            condition: weather.weather.description,
            conditionPic: weather.weather.id
        })
    })
})