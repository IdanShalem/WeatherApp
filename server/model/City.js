const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema

const citySchema = new Schema ({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String,
    cityId: String
})

const City = mongoose.model("City", citySchema)

module.exports = City