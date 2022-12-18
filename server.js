const express = require('express')
const app = express()

app.set('view engine', 'ejs')

// define simple route
app.get('/', (req, res) => {
  // return an index file
  res.render('index')
})

app.listen(process.env.PORT || 5001)
