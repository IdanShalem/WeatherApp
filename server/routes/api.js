const express = require('express')
const router = express.Router()
const axios = require('axios')

const City = require('../model/City')

const apiKey = 'appid=516eda5415931599ef12e92f4733ebf9' //the API key for getting JSON files
const getAPIByName = (cityName) => { 
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&${apiKey}` 
}

const getAPIById = (cityId) => { 
    return `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&${apiKey}` 
}

const getAPIByLoc = (lat, lng) => { 
    return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&${apiKey}` 
}

const assignCity = (weatherData) =>{
    return new City ({
        name: weatherData.data.name,
        temperature: Math.round(weatherData.data.main.temp),
        condition: weatherData.data['weather'][0].description,
        conditionPic: weatherData.data['weather'][0].icon,
        cityId: weatherData.data.id
    })
}

router.get('/city/:cityName/:lat?/:lng?', async function(req, res) {
    const { cityName, lat, lng } = req.params
    try{
        let weatherData
        if(lat && lng) {
            weatherData = await axios.get(getAPIByLoc(lat, lng))
        } else{
            weatherData = await axios.get(getAPIByName(cityName))
        }
        const city = assignCity(weatherData)
        res.send(city)
    } catch(error){
        res.send(error)
    }
})

router.get('/cityById/:cityId', async function(req, res) {
    const { cityId } = req.params
    try{
        const weatherData = await axios.get(getAPIById(cityId))
        const city = assignCity(weatherData)
        res.send(city)
    } catch(error){
        res.send(error)
    }
})

router.put('/city/:cityId', async function(req, res) {
    const { cityId } = req.params
    try{
        const weatherData = await axios.get(getAPIById(cityId))
        City.findOneAndUpdate(
            {'cityId': cityId},
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