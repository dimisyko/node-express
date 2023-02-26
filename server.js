require('dotenv').config()
const express = require("express")
const app = express()
const logger = require('morgan')
const { join } = require('path')
const fs = require('fs').promises
const port = process.env.PORT || 3000

const urlFile = __dirname +'/src/data/'

async function readJson(file){
  try {
    const data = await fs.readFile(join(urlFile, file), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}


app.set('view engine', 'ejs')
app.set('views', 'src/pages')

app
  .use(express.static(__dirname + '/dist'))
  .use(logger('dev'))
  
  app.get('/', async (req, res) => {
    const data = await readJson("detail.json")
    res.render('index', { data })
  })

app.get("/project/:id", async (req, res) => {
  const data = await readJson("detail.json")
    const detail = data.detailPage.find( data => data.page === req.params.id)
    if (!detail) res.status(404).render('404')
    const projectIndex = data.detailPage.indexOf(detail)
    const nextProject = data.detailPage[projectIndex + 1] ? data.detailPage[projectIndex + 1] : data.detailPage[0]
    const prevProject = data.detailPage[projectIndex - 1] ? data.detailPage[projectIndex - 1] : data.detailPage[data.detailPage.length - 1]
    res.render('detail', { detail, nextProject, prevProject })
})
app.use((req, res) => {
    res.status(404).render("404")
})

app.listen(port)