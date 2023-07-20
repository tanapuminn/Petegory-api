const mongoose = require('mongoose');
const groomingSchema = new mongoose.Schema({
    groomId:{
        type: String
    },
    petname: {
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    pettype:{
        type:String,
        require: true
    },
    addon:{
        type:String,
        require: true
    },
    breed:{
        type:String,
        require: true
    },
    date:{
        type:Object,
        required:true,

    },
    time:{
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }


}) 

const groomingModel = mongoose.model('bookingGrooming',groomingSchema);
module.exports = groomingModel;