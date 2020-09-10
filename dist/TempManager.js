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
        const cityToSavew =  await $.post(`/city`, this.cityData[index]) 
        this.cityData[index].isSaved = true
    }

    removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            method: 'DELETE',
            success: function(city){
                const index = this.cityData.findIndex(c => c == city)
                this.cityData.splice(index, 1)
            }   
        })
    }

}