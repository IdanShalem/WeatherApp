const tempManager = new TempManager()
const render = new Render()

const run = async function() {
    await tempManager.getDataFromDB()
    render.renderData(tempManager.cityData) 
}

run()