const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    product_name: {
        type: String
    },
    product_price: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
    },
    total_price: {
        type: Number,
    }
}, { timestamps: true })

module.exports = User = mongoose.model('orders', OrderSchema)