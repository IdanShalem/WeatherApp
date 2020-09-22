class TempManager {

    constructor() {
        this.cityData = []
    }

    cityFinder(method, itemToFind, identifier) {
        return this.cityData[method](c => c[itemToFind] == identifier)
    }

    async getDataFromDB() {
        const citiesDB = await $.get('/cities')
        citiesDB.forEach(city => this.cityData.push({...city, isSaved: true}))
    }

    async getCityData(cityName, lat = '', lng = '') {
        let city
        if(lat && lng) {
            city = await $.get(`/city/${cityName}/${lat}/${lng}`)
        } else {
            city = await $.get(`/city/${cityName}`)
        }
<<<<<<< HEAD
        if(city.name === 'Error' || city.code === "ERR_UNESCAPED_CHARACTERS") {
=======
        if(city.name === 'Error') {
>>>>>>> 7eb47cc504468363d07c7228c3d2bf209a1b45de
            return false 
        } else { 
            this.cityData.push({...city, isSaved: false}) 
            return true
        }
    }

    async updateCityData(id) {
        const cityInArr = this.cityFinder('findIndex', '_id', id)
        const savedCity = this.cityData[cityInArr].isSaved
        const cityId = this.cityData[cityInArr].cityId
        let updatedCity
        if(savedCity) {
                updatedCity = await $.ajax({
                method: 'PUT',
                url: `/city/${cityId}`,
            })
        } else {
            updatedCity = await $.get(`/cityById/${cityId}`)
        }
        this.cityData[cityInArr] = {...updatedCity, isSaved: savedCity}
    }

    async saveCity(cityId) {
        const index = this.cityFinder('findIndex', '_id', cityId)
        await $.post(`/city`, this.cityData[index]) 
        this.cityData[index].isSaved = true
    }

    async removeCity(cityId) {
        const index = this.cityFinder('findIndex', '_id', cityId)
        const cityName = this.cityData[index].name
        await $.ajax({
            url: `/city/${cityName}`,
            method: 'DELETE'  
        })
        this.cityData.splice(index, 1)
    }

    checkCityExist(cityName) {
        const index = this.cityData.findIndex(c => c.name.toLowerCase() === cityName.toLowerCase())
        if( index === -1){
            return true
        } 
        return false
    }

}