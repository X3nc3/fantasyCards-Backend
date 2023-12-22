const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    status: String,
    gamesId: [{type: mongoose.Schema.Types.ObjectId, ref: 'games'}],
    usersId: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]

})

const Event = mongoose.model('events', eventSchema)

module.exports = Event