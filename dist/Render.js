class Render {

    renderCurrentLoc(city) {
        const src = $('#current-loc-template').html()
        const template = Handlebars.compile(src)
        const newHTML = template(city) 
        $('#current-loc').empty().append(newHTML)
    }

    renderCities(allCityData) {
        const src = $('#cities-template').html()
        const template = Handlebars.compile(src)
        const newHTML = template({allCityData}) 
        $('#cities-to-render').empty().append(newHTML)
    }

    renderError(errText){
        setTimeout(function(){$('#popup-error').css('visibility', 'hidden')}, 3000)
        $('#popup-error').empty().append(errText).css('visibility', 'visible')
    }

}