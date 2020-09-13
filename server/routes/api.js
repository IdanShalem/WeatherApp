const express = require('express')
const router = express.Router()
const axios = require('axios')

const City = require('../model/City')

const apiKey = 'appid=516eda5415931599ef12e92f4733ebf9' //the API key for getting JSON files
const getAPI = (cityName) => { 
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&${apiKey}` }


router.get('/defaultCity', async function(req, res) {
    try{
        const weatherData = await axios.get(getAPI('tel-aviv'))
        const city = {
            name: weatherData.data.name,
            temperature: weatherData.data.main.temp,
            condition: weatherData.data['weather'][0].description,
            conditionPic: weatherData.data['weather'][0].id
        }
        res.send(city)
    }
    catch(error){
        res.send(error)
    }
})

router.get('/city/:cityName', async function(req, res) {
    const { cityName } = req.params
    try{
        const weatherData = await axios.get(getAPI(cityName))
        const city = new City ({
            name: weatherData.data.name,
            temperature: Math.round(weatherData.data.main.temp),
            condition: weatherData.data['weather'][0].description,
            conditionPic: weatherData.data['weather'][0].icon
        })
        res.send(city)
    } catch(error){
        res.send(error)
    }
})

router.put('/city/:cityName', async function(req, res) {
    const { cityName } = req.params
    try{
        const weatherData = await axios.get(getAPI(cityName))
        City.findOneAndUpdate(
            {'name': cityName},
            { $set:{
                temperature: Math.round(weatherData.data.main.temp),
                condition: weatherData.data['weather'][0].description,
                conditionPic: weatherData.data['weather'][0].icon
            } },
            {new: true},
            (err, city) => {
                res.send(city)
            }
        )
        
    } catch(error){
        res.send(error)
    }
})

router.get('/cities', function(req, res) {
    City.find({}).then(cities => res.send(cities))
})

router.post('/city' , function(req, res) {
    const city = req.body
    const newCity = new City({...city})
    newCity.save().then(c => res.send(c))
})

router.delete('/city/:cityName', function(req, res) {
    const { cityName } = req.params
    City.findOneAndDelete({'name': cityName}, function(err, c) {
        if (err){ 
            res.send(err) 
        } 
        else{ 
            res.send(c) 
        }
    })
})
module.exports = router