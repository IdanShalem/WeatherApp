class Render {

    renderData(allCityData) {
        const src = $('#cities-template').html()
        const template = Handlebars.compile(src)
        const newHTML = template({allCityData}) 
        $('#cities-to-render').empty().append(newHTML)
    }
    
    renderError(errText){
        setTimeout(function(){$('#popup-error').removeClass('show')}, 3000)
        $('#popup-error').addClass('show').empty().append(errText)
    }

}