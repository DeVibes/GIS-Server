const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    personName:{
        type: String
    }
})

module.exports = mongoose.model('Users', UsersSchema);