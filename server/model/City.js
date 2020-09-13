const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/WeatherDB', {useNewUrlParser: true})
mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema

const citySchema = new Schema ({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model("City", citySchema)

module.exports = City