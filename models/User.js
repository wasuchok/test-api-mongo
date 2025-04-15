const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: String,
    },
    rate_discount: {
        type: Number, default: null,
    },
    wallet: {
        type: Number,
        default: 0
    }
},)

module.exports = User = mongoose.model('users', UserSchema)