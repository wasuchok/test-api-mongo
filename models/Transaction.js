const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String, enum: ['income', 'expense']
    },
    amount: {
        type: Number
    }
}, { timestamps: true })

module.exports = User = mongoose.model('transactions', TransactionSchema)