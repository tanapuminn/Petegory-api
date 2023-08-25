const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users",
      required: true
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
    roomType: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    startDate: {
      type: Object,
      required: true,
    },
    endDate: {
      type: Object,
      required: true,
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
