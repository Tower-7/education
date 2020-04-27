const mongoose = require('mongoose')
let UserSchema = require('../Schemas/user')
let User = mongoose.model('User',UserSchema)

module.exports = User