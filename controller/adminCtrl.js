const userModel = require("../models/userModels");
const hotelDetailModel = require("../models/hotelDetailModel");
const employeeModel = require("../models/employeeModel");
const hotelModel = require("../models/hotelModel");
const groomingModel = require("../models/groomingModel");
const path = require('path')

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({ isAdmin: false, isEmployee: false });
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllEmployeeController = async (req, res) => {
  try {
    const employees = await userModel.find({ isEmployee: true });
    res.status(200).send({
      success: true,
      message: "employees data list",
      data: employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const createHotelController = async (req, res) => {
  try {
    await hotelDetailModel.create({
      type: req.body.type,
      price: req.body.price,
      title1: req.body.title1,
      title2: req.body.title2,
      title3: req.body.title3,
      title4: req.body.title4,
      title5: req.body.title5,
      image: req.file.filename,
    });
    res.status(200).send({
      success: true,
      message: "create detail success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "create details error",
      error,
    });
  }
};

const getHotelController = async (req, res) => {
  try {
    const detail = await hotelDetailModel.find({});
    res.status(200).send({
      success: true,
      message: "details data list",
      data: detail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching details",
      error,
    });
  }
};

const editHotelController = async (req, res) => {
  try {
    const id = req.params.id;

    const hotel = await hotelDetailModel.findById({ _id: id });

    if (hotel) {
      res.status(200).send({
        success: true,
        message: "Hotel data get successfully",
        data: hotel,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Hotel not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error get hotel data",
    });
  }
};

const updateHotelController = async (req, res) => {
  try {
    const id = req.params.id;
    const { type, price, title1, title2, title3, title4, title5,} = req.body;
  
    let updateFields = {
      type,
      price,
      title1,
      title2,
      title3,
      title4,
      title5,
    };
    if (req.file) {
      updateFields.image = req.file.filename;
    }
    const updateHotel = await hotelDetailModel.findByIdAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Update hotel successfully",
      data: updateHotel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating hotel data",
    });
  }
};

const deleteHotelsController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await hotelDetailModel.findByIdAndDelete({ _id: userId });
    res.status(200).send({
      success: true,
      message: "Deleted Hotel successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Hotel",
      error,
    });
  }
};

const getUserCountController = async (req, res) => {
  try {
    const userCount = await userModel
      .findOne({ isEmployee: false, isAdmin: false })
      .countDocuments();

    res.status(200).send({
      success: true,
      message: "users total list",
      data: userCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching details",
      error,
    });
  }
};

const getBookHotelCountController = async (req, res) => {
  try {
    const BookingHotelCount = await hotelModel.countDocuments();

    res.status(200).send({
      success: true,
      message: "Hotel Booking total list",
      data: BookingHotelCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching details",
      error,
    });
  }
};

const getBookGroomingCountController = async (req, res) => {
  try {
    const BookingGroomingCount = await groomingModel.countDocuments();

    res.status(200).send({
      success: true,
      message: "Grooming Booking total list",
      data: BookingGroomingCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching details",
      error,
    });
  }
};

const changeStatusController = async (req, res) => {
  try {
    const { isEmployee } = req.body;
    const user = await userModel.findById(isEmployee);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (isEmployee) {
      user.isEmployee = true;
    }
    await user.save();

    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

const statusBookHotelController = async (req, res) => {
  try {
    const { status } = req.body;
    const bookHotel = await hotelModel.findByIdAndUpdate(status);

    if (!bookHotel) {
      return res.status(404).send({
        success: false,
        message: "Hotel booking not found.",
      });
    }

    if (bookHotel.status === "pending") {
      bookHotel.status = "success";

      await bookHotel.save();

      res.status(201).send({
        success: true,
        message: "Status is Updated",
        data: bookHotel,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid status update.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Status",
      error,
    });
  }
};
const statusBookGroomingController = async (req, res) => {
  try {
    const { status } = req.body;
    const bookGrooming = await groomingModel.findByIdAndUpdate(status);

    if (!bookGrooming) {
      return res.status(404).send({
        success: false,
        message: "Frooming booking not found.",
      });
    }

    if (bookGrooming.status === "pending") {
      bookGrooming.status = "success";

      await bookGrooming.save();

      res.status(201).send({
        success: true,
        message: "Status is Updated",
        data: bookGrooming,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid status update.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Status",
      error,
    });
  }
};

const editUserController = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById({ _id: id });

    if (user) {
      res.status(200).send({
        success: true,
        message: "User data get successfully",
        data: user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error get user data",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const updateUser = await userModel.findByIdAndUpdate(
      { _id: id },
      { name, email, phone }
    );
    res.status(200).send({
      success: true,
      message: "Update user successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating user data",
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting user",
      error,
    });
  }
};

const editEmployeeController = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById({ _id: id });

    if (user) {
      res.status(200).send({
        success: true,
        message: "Employee data get successfully",
        data: user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Employee not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error get Employee data",
    });
  }
};

const updateEmployeeController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone, role } = req.body;
    const updateUser = await userModel.findByIdAndUpdate(
      { _id: id },
      { name, email, phone, role }
    );
    res.status(200).send({
      success: true,
      message: "Update Employee successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating Employee data",
    });
  }
};
const getAllbookingHotelsController = async (req, res) => {
  try {
    const user = await hotelModel.find();
    user.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).send({
      success: true,
      message: "all details booking list",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching details",
      error,
    });
  }
};

const editBookHotelController = async (req, res) => {
  try {
    const userId = req.params.id;
    // const user = {userId}

    const user = await hotelModel.findOne(
      { _id: userId },
      { userId: 1, _id: 0, time: 1, startDate: 1, endDate: 1 }
    );

    if (user) {
      res.status(200).send({
        success: true,
        message: "User Booked get successfully",
        data: user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User Booked not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error get User Booked",
    });
  }
};

const updateBookHotelController = async (req, res) => {
  try {
    const id = req.params.id;
    const { startDate, endDate, time } = req.body;
    const updateUser = await hotelModel.findByIdAndUpdate(
      { _id: id },
      { startDate, endDate, time }
    );
    res.status(200).send({
      success: true,
      message: "Update User Booked successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating User Booked",
    });
  }
};

const deleteBookHotelController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await hotelModel.findByIdAndDelete({ _id: userId });
    res.status(200).send({
      success: true,
      message: "Booked Hotel deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Booked Hotel",
      error,
    });
  }
};

const getAllbookingGroomingController = async (req, res) => {
  try {
    const user = await groomingModel.find();
    user.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).send({
      success: true,
      message: "all details booking list",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching details",
      error,
    });
  }
};
const deleteBookedGroomingController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await groomingModel.findByIdAndDelete({ _id: userId });
    res.status(200).send({
      success: true,
      message: "Booked Grooming deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Booked Grooming",
      error,
    });
  }
};

const getBookingHistory = async () => {
  try {
    const hotelBookings = await hotelModel.find({ status: "pending" });
    const groomingBookings = await groomingModel.find({ status: "pending" });

    const bookingHistory = [...hotelBookings, ...groomingBookings];

    bookingHistory.sort((a, b) => b.createdAt - a.createdAt);

    return bookingHistory;
  } catch (error) {
    throw error;
  }
};
const sendBookingHistory = async (req, res) => {
  try {
    const bookingHistory = await getBookingHistory();
    return res.status(200).send({ success: true, data: bookingHistory });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "An error occurred" });
  }
};

module.exports = {
  getAllUsersController,
  getAllEmployeeController,
  createHotelController,
  getHotelController,
  editHotelController,
  updateHotelController,
  deleteHotelsController,
  getUserCountController,
  getBookHotelCountController,
  getBookGroomingCountController,
  changeStatusController,
  statusBookHotelController,
  statusBookGroomingController,
  editUserController,
  updateUserController,
  deleteUserController,
  editEmployeeController,
  updateEmployeeController,
  getAllbookingHotelsController,
  editBookHotelController,
  updateBookHotelController,
  deleteBookHotelController,
  getAllbookingGroomingController,
  deleteBookedGroomingController,
  sendBookingHistory,
};
