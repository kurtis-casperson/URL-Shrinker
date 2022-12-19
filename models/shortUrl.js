const mongoose = require('mongoose')
const shortId = require('shortid')

// takes an object that contains all of the columns for the database
const shortUrlSchema = new mongoose.Schema({
  // Full is the name of the column (full URL)
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    // shortId library to auto generate unique short id URL
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
})

// this hooks the database to the model
module.exports = mongoose.model('shortUrl', shortUrlSchema)
