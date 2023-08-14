const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hotelModel = require("../models/hotelModel");
const hoteldetailModel = require("../models/hotelDetailModel");
const employeeModel = require("../models/employeeModel");
const moment = require("moment");
const nodemailer = require('nodemailer')

const { notifyLine } = require("../Functions/Notify");
const tokenLine = "5Ir6hjUjIQ6374TGO91Fv1DA7ewZlh5UQodcI8DU65N";

const signupController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = await req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
const bookGroomingController = async (req, res) => {
  try {
    const newGrooming = await groomingModel({ ...req.body, status: "pending" });
    await newGrooming.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    // const employeeUser = await userModel.findOne({ isEmployee: true });

    const notificationAdmin = {
      type: "grooming-booking-request",
      message: `New Booking for Cat Hotel
            Petname: ${newGrooming.petname}
            Typepet: ${newGrooming.pettype}
            number: ${newGrooming.number}
            Date: ${newGrooming.date}
            Add-on: ${newGrooming.addon}
            Breed:${newGrooming.breed}
            Time: ${newGrooming.time}น.`,
      data: {
        hotelId: newGrooming._id,
        name: newGrooming.petname,
        onClickPath: "/admin/dashboard/hotel",
      },
    };
    await adminUser.save();
    //update notification
    await userModel.findOneAndUpdate(
      { _id: adminUser._id },
      { $push: { notification: notificationAdmin } }
    );
    res.status(201).send({
      success: true,
      message: " Booking Grooming Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Booking for Grooming",
    });
  }
};

const bookHotelController = async (req, res) => {
  try {
    const userId = req.body._id;
    const newHotel = await hotelModel({ ...req.body, userId, status: "pending" });
    await newHotel.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const employeeUser = await userModel.findOne({ isEmployee: true });
    const formattedStartDate = moment(newHotel.startDate).format("DD/MM/YYYY");
    const formattedEndDate = moment(newHotel.endDate).format("DD/MM/YYYY");

    const notificationAdmin = {
      type: "hotel-booking-request",
      message: `New Booking for Cat Hotel
            Name: ${newHotel.name}
            Petname: ${newHotel.petname}
            Typeroom: ${newHotel.room}
            Date: ${formattedStartDate} - ${formattedEndDate}
            Time: ${newHotel.time}น.`,
      data: {
        hotelId: newHotel._id,
        name: newHotel.name + " " + newHotel.petname,
        onClickPath: "/admin/dashboard/hotel",
      },
    };

    const notificationEmployee = {
      type: "hotel-booking-request",
      message: `New Booking for Cat Hotel
            Name: ${newHotel.name}
            Petname: ${newHotel.petname}
            Typeroom: ${newHotel.room}
            Date: ${formattedStartDate} - ${formattedEndDate}
            Time: ${newHotel.time}น.`,
      data: {
        hotelId: newHotel._id,
        name: newHotel.name + " " + newHotel.petname,
        onClickPath: "/employee/dashboard/hotel",
      },
    };

    employeeUser.notification.push(notificationEmployee);

    await adminUser.save();
    await employeeUser.save();
    //update notification
    await userModel.findOneAndUpdate(
      { _id: adminUser._id },
      { $push: { notification: notificationAdmin } }
    );
    res.status(201).send({
      success: true,
      message: "Cat Hotel Booking Successfully",
    });

    //notify
    const text = notificationAdmin.message;
    await notifyLine(tokenLine, text);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Booking for Hotel",
    });
  }
};

const getAllNotiController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenotification = user.seenotification;
    const notification = user.notification;
    seenotification.push(...notification);
    user.notification = [];
    user.seenotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

const deleteAllNotiController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

const getDetailHotelController = async (req, res) => {
  try {
    const detail = await hoteldetailModel.find({});
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

const myBookingController = async (req, res) => {
  try {
    const userId = req.body._id;
    const user = await hotelModel.find(userId)
    res.status(200).send({
      success: true,
      message: "details booking list",
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

const changePasswordController = async (req, res) => {
  const userId = req.body.userId;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can not change password" });
  }
};

const forgotPasswordController = async (req,res) => {
    const {email} = req.body;
      await userModel.findOne({email})
      .then(user => {
        if(!user) {
            return res.send({message: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
              user: 'tanapumin.fo@gmail.com',
              pass: 'umvsulynvqfehyde'
            }
          });
          
          var mailOptions = {
            from: 'tanapumin.fo@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("Email send error:", error);
            } else {
              console.log("Email sent:", info.response);
              return res.send({success: true})
            }
          });
          return res.send({success: true});
    })
    .catch(error => {
      console.log(error);
      return res.send({message: "An error occurred"});
    });
}

const resetPasswordController = (req,res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, 'jwt_secret_key', (err, decode) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error with token'
      })
    } else {
       bcrypt.hash(password, 10)
      .then(hash => {
        userModel.findByIdAndUpdate({_id: id}, {password: hash})
        .then(u => res.send({success: true}))
        .catch(err => res.send({
          success: false,
          message: 'Hash Error'
        }
        ))
      })
      .catch(err => res.send({
        success: false,
        message: 'Error to hash reset'
      }))
    }
  })
}


module.exports = {
  loginController,
  signupController,
  authController,
  bookHotelController,
  getAllNotiController,
  deleteAllNotiController,
  getDetailHotelController,
  deleteUserController,
  myBookingController,
  changePasswordController,
  forgotPasswordController,
  resetPasswordController
};
