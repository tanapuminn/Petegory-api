const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is require'],
    },
    email: {
        type: String,
        required: [true, 'email is require'],
    },
    phone: {
        type: String,
        required: [true, 'phone is require']
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'password is require']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isEmployee: {
        type: Boolean,
        default: false
    },
    notification: {
        type: Array,
        default: []
    },
    seenotification: {
        type: Array,
        default: []
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;