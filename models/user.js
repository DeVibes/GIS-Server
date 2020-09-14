const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    personName:{
        type: String
    }
})

module.exports = mongoose.model('Users', UsersSchema);