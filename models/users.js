const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    stock: Number,
    token: String,
    credits: Number,
    cardsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'cards'}],
    packsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'packs'}],
})

const User = mongoose.model('users', userSchema)

module.exports = User