const userModel = require("../models/userModels")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hotelModel = require('../models/hotelModel')

const signupController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email })
        if (exisitingUser) {
            return res.status(200).send({ message: 'User Already Exist', success: false })
        }
        const password = await req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // req.body.password = hashedPassword;
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).send({ message: 'Register Successfully', success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` })
    }
}

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res
            .status(200)
            .send({ message: 'User Not Found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res
            .status(200)
            .send({ message: 'Invalid Email or Password', success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Success', success: true, token })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` })
    }
}

const authController = async (req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId});
        user.password = undefined;
        if(!user) {
            return res.status(200).send({
                message: 'user not found',
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}

const bookHotelController = async (req,res) => {
    try {
        const newHotel = await hotelModel({...req.body, status: 'pending'})
        await newHotel.save()
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification || [];
        notification.push({
            type: 'hotel-booking-request',
            message: `${newHotel.name} ${newHotel.petname} Has Booking for Cat Hotel`,
            data: {
                hotelId: newHotel._id,
                name: newHotel.name + " " + newHotel.petname,
                onClickPath: '/admin/dashboard/hotel',
            }
        })
        await userModel.findOneAndUpdate({_id: adminUser._id} , {notification})
        res.status(201).send({
            success: true,
            message: 'Cat Hotel Booking Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error Booking for Hotel'
        })
    }
}


module.exports = { loginController, signupController,authController,bookHotelController}