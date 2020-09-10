const tempManager = new TempManager()
const render = new Render()

const loadPage = async function() {
    await tempManager.getDataFromDB()
    render.renderData(tempManager.cityData) 
}

const handleSearch = async function(){
    const cityInput = $('#city-input').val()
    await tempManager.getCityData(cityInput)
    render.renderData(tempManager.cityData) 
    $('#city-input').val('')
}

$('#cities-to-render').on('click', '.fa-plus-circle', async function() {
    const cityId = $(this).closest('.city').data().id
    await tempManager.saveCity(cityId)
    render.renderData(tempManager.cityData) 
})

loadPage()