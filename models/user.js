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
    personName: {
        type: String
    },
    savedAddresses: {
        type: [
            {
                nickName: String,
                address: String,
                coords: {
                    type: {
                        lat: Number,
                        lng: Number
                    }
                }
            }
        ]
    }
})

module.exports = mongoose.model('Users', UsersSchema);