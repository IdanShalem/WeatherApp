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

    async getCityData(cityName) {
        const city = await $.get(`/city/${cityName}`)
        if(city.name === 'Error') {
            return false 
        } else { 
            this.cityData.push({...city, searchQuery: cityName, isSaved: false}) 
            return true
        }
    }

    async updateCityData(cityId) {
        const cityInArr = this.cityFinder('findIndex', '_id', cityId)
        const savedCity = this.cityData[cityInArr].isSaved
        let updatedCity
        if(savedCity) {
                updatedCity = await $.ajax({
                method: 'PUT',
                url: `/city/${this.cityData[cityInArr].searchQuery}`
            })
        } else {
            updatedCity = await $.get(`/city/${this.cityData[cityInArr].searchQuery}`)
        }
        this.cityData[cityInArr] = {...updatedCity, searchQuery: cityName, isSaved: savedCity}
    }

    async saveCity(cityId) {
        const index = this.cityData.findIndex(c => c._id === cityId)
        await $.post(`/city`, this.cityData[index]) 
        this.cityData[index].isSaved = true
    }

    async removeCity(cityId) {
        const index = this.cityData.findIndex(c => c._id === cityId)
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