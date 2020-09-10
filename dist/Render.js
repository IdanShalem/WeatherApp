class Render {

    renderData(citiesData) {
        const src = $('#cities-template').html()
        const template = Handlebars.compile(src)
        const newHTML = template({citiesData}) 
        $('#cities-to-render').append(newHTML)
    }

}