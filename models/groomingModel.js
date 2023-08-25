const mongoose = require("mongoose");
const groomingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  PetName: {
    type: String,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  pet_type: {
    type: String,
    require: true,
  },
  addon: {
    type: Array,
    require: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const groomingModel = mongoose.model("bookingGrooming", groomingSchema);
module.exports = groomingModel;
