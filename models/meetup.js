const mongoose = require('mongoose')

const MeetupSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: String
    },
    address: {
        type: String
    },
    coords: {
        type: {
            lat: Number,
            lng: Number
        }
    },
    admin: {
        type: String
    },
    participants: {
        type: [String]
    },
    maxParticipants: {
        type: Number
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Meetups', MeetupSchema);