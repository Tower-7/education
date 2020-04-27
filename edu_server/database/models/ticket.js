const mongoose = require('mongoose')
let TicketSchema = require('../schemas/ticket')
let Ticket = mongoose.model('Ticket',TicketSchema)

module.exports = Ticket