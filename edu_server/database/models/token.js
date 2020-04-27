const mongoose = require('mongoose')
let tokenSchema = require('../schemas/token')
let token = mongoose.model('token',tokenSchema)

module.exports = token