const mongoose = require('mongoose')
let EssaySchema = require('../Schemas/essay')
let Essay = mongoose.model('Essay',EssaySchema)

module.exports = Essay