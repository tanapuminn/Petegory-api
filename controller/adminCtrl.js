const userModel = require("../models/userModels");
const hotelDetailModel = require("../models/hotelDetailModel");
const employeeModel = require("../models/employeeModel");
const hotelModel = require("../models/hotelModel")

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

const getUserCountController = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();

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

const changeStatusController = async (req, res) => {
  try {
    const { isEmployee } = req.body;
    const employees = await userModel.findByIdAndUpdate(isEmployee);

    // ตรวจสอบว่าค่า role เป็น 'barber' เพื่อกำหนดค่า isEmployee เป็น true
    if (employees.role === "barber") {
      employees.isEmployee = true;
    }

    await employees.save();

    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: employees,
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

const editEmployeeController = async (req,res) => {
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
}

const updateEmployeeController = async (req,res) => {
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
}
const getAllbookingHotelsController = async (req,res) => {
  try {
    const user = await hotelModel.find();
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
}

module.exports = {
  getAllUsersController,
  getAllEmployeeController,
  createHotelController,
  getHotelController,
  getUserCountController,
  changeStatusController,
  editUserController,
  updateUserController,
  deleteUserController,
  editEmployeeController,
  updateEmployeeController,
  getAllbookingHotelsController
};
