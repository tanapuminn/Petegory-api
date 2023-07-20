const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    bookId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    petname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    startDate: {
        type: Object,
        required: true
    },
    endDate: {
        type: Object,
        required: true
    },
    time: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const hotelModel = mongoose.model('bookingHotel', hotelSchema)
module.exports = hotelModel;