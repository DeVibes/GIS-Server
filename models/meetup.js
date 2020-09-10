const mongoose = require('mongoose')

const MeetupSchema = new mongoose.Schema({
    _id: { 
        type: String
    },
    name: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: Date
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
})

module.exports = mongoose.model('Meetups', MeetupSchema);