const mongoose = require('mongoose')
let NewsSchema = require('../Schemas/news')
let News = mongoose.model('New',NewsSchema)

module.exports = News