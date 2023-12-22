const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    id: Number,
    name: String,
    country: String,
    image: String,
    sport: String
})

const Team = mongoose.model('teams', teamSchema)

module.exports = Team