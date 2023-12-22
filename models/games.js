const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    gameId: Number,
    teamHomeId: Number,
    teamAwayId: Number,
    startDate: Date,
    endDate: Date,
    status: String,
    winnerTeamHome: Boolean,
    winnerTeamAway: Boolean
})

const Game = mongoose.model('games', gameSchema)

module.exports = Game