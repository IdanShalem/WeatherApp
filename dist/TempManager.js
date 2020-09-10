class TempManager {

    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        const citiesDB = await $.get('/cities')
        citiesDB.forEach(city => this.cityData.push({...city, isSaved: true}))
    }

    async getCityData(cityName) {
        const city = await $.get(`/city/${cityName}`)
        this.cityData.push({...city, isSaved: false})
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

}