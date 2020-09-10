const express = require('express')
const router = express.Router()
const urllib = require('urllib')

const City = require('../model/City')

const apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=' //API url for request a weather by city
const metricUnits = 'units=metric' //a query param for results in celsius
const apiKey = 'appid=516eda5415931599ef12e92f4733ebf9' //the API key for getting JSON files


router.get('/defaultCity', function(req, res) {
    urllib.request(`tel-aviv&${metricUnits}&${apiKey}`, function(err, weather) {
        if(err){
            res.send(err)
        }
        const defaultCity = new City({
            name: weather.name,
            temperature: weather.main.temp,
            condition: weather.weather.description,
            conditionPic: weather.weather.id
        })
        defaultCity.save().then(c => res.send(c))
    })
})