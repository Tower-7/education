const mongoose = require('mongoose')
let TeacherSchema = require('../Schemas/teacher')
let Teacher = mongoose.model('Teacher',TeacherSchema)

module.exports = Teacher