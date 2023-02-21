require('dotenv').config()
const express = require("express")
const app = express()
const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('./src/data/detail.json'))

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', 'src/pages')

app
  .use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
    res.render('index', { data })
  })
app.get("/project/:id", (req, res) => {
    const dataDetail = data.detailPage.find( data => data.page === req.params.id)
    if (!dataDetail) res.status(404).render('404')
    const projectIndex = data.detailPage.indexOf(dataDetail)
    const next = data.detailPage[projectIndex + 1] ? data.detailPage[projectIndex + 1] : data.detailPage[0]
    res.render('detail', { dataDetail, next })
})
app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(port)