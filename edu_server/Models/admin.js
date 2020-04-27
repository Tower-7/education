const mongoose = require('mongoose')
let AdminSchema = require('../Schemas/admin')
let Admin = mongoose.model('Admin',AdminSchema)

module.exports = Admin