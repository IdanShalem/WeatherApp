const tempManager = new TempManager()
const render = new Render()

const loadPage = async function() {
    await tempManager.getDataFromDB()
    render.renderData(tempManager.cityData) 
}

const handleSearch = async function(){
    const cityInput = $('#city-input').val()
    const isCityExists = tempManager.checkCityExist(cityInput)
    if(isCityExists) {
        const cityData = await tempManager.getCityData(cityInput)
        if(cityData) {
            render.renderData(tempManager.cityData) 
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
    render.renderData(tempManager.cityData) 
})

$('#cities-to-render').on('click', '.fa-minus-circle', async function() {
    const cityId = findCityId($(this))
    await tempManager.removeCity(cityId)
    render.renderData(tempManager.cityData) 
})

$('#cities-to-render').on('click', '.fa-retweet', async function() {
    const cityId = findCityId($(this))
    await tempManager.updateCityData(cityId)
    render.renderData(tempManager.cityData)
})

loadPage()