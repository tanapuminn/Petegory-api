const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users", // ระบุชื่อโมเดลผู้ใช้
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
      type: String,
      required: true,
    },
    endDate: {
      type: String,
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
