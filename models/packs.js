const mongoose = require('mongoose')

const packPriceSchema = mongoose.Schema({
    userToken: { type: mongoose.Schema.Types.String, ref: 'users' },
    price: Number,
})

const packSchema = mongoose.Schema({
    rarity: Number,
    stock: Number,
    packPrices: [packPriceSchema]
})

const Pack = mongoose.model('packs', packSchema)

module.exports = Pack