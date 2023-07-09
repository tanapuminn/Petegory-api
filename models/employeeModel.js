const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({})

const employeeModel = mongoose.model('users', employeeSchema)
module.exports = employeeModel;