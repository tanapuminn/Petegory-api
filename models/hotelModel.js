const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    petname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    time: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const hotelModel = mongoose.model("bookingHotel", hotelSchema);
module.exports = hotelModel;
