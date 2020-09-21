const tempManager = new TempManager()
const render = new Render()

const loadPage = async function() {
    navigator.geolocation.getCurrentPosition(async function(pos){
        await tempManager.getCityData('b', pos.coords.latitude, pos.coords.longitude)
        render.renderCurrentLoc(tempManager.cityData[tempManager.cityData.length - 1])
        tempManager.cityData.splice(tempManager.cityData.length - 1)
    })
    await tempManager.getDataFromDB()
    render.renderCities(tempManager.cityData) 
}

const handleSearch = async function(){
    const cityInput = $('#city-input').val()
    const isCityExists = tempManager.checkCityExist(cityInput)
    if(isCityExists) {
        const cityData = await tempManager.getCityData(cityInput)
        if(cityData) {
            render.renderCities(tempManager.cityData) 
        } else {
            render.renderError(`COULDN'T FIND CITY`)
        } 
    } else {
        render.renderError('CITY ALREADY EXSISTS')
    }  
    $('#city-input').val('')
}

const findCityId = (element) => {
    return element.closest('.city').data().id
}

$('#cities-to-render').on('click', '.fa-plus-circle', async function() {
    const cityId = findCityId($(this))
    await tempManager.saveCity(cityId)
    render.renderCities(tempManager.cityData) 
})

$('#cities-to-render').on('click', '.fa-minus-circle', async function() {
    const cityId = findCityId($(this))
    await tempManager.removeCity(cityId)
    render.renderCities(tempManager.cityData) 
})

$('#cities-to-render').on('click', '.fa-retweet', async function() {
    const cityId = findCityId($(this))
    await tempManager.updateCityData(cityId)
    render.renderCities(tempManager.cityData)
})

loadPage()