const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is require'],
    },
    email: {
        type: String,
        required: [true, 'email is require'],
    },
    phone: {
        type: Number,
        required: [true, 'phone is require']
    },
    password: {
        type: String,
        required: [true, 'password is require']
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

const employeeModel = mongoose.model('users', employeeSchema)
module.exports = employeeModel;