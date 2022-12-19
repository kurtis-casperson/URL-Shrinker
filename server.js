const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// mongoose.connect(process.env.MONGO_URL)

app.set('view engine', 'ejs')
// tell out app that we are using URL parameters
// This allows the shortURL.create to work properly
app.use(express.urlencoded({ extended: false }))

// define simple route
app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  // return an index file
  res.render('index', { shortUrls: shortUrls })
})

// make async so we wait until this is created
app.post('/shortUrls', async (req, res) => {
  // import the short URL schema, and it allows us to create a new url
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
  // redirect back to home page
})

// Direct to URL when clicking on short URL
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl === null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5001)
