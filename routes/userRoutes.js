const express = require('express')
const {
    loginController, 
    signupController,
    authController, 
    bookHotelController, 
    getAllNotiController,
    deleteAllNotiController,
    getDetailHotelController,
    myBookingController,
    changePasswordController,
    forgotPasswordController,
    resetPasswordController,
    userEditController,
    getUserProfileController,
    isRoomBookedController
} = require('../controller/userCtrl');
const auth = require('../middlewares/auth');

const router = express.Router();


router.post('/login', loginController)

router.post('/signup', signupController)
// router.post('/employeesignup', employeeSignupController)

router.post('/getUserData', auth, authController)

router.get('/isRoomBooked', auth, isRoomBookedController)
router.post('/bookHotel', auth, bookHotelController)

//Notification Hotel
router.post('/getNotification', auth, getAllNotiController)
router.post('/deleteNotification', auth, deleteAllNotiController)

//get detail hotels
router.get('/getDetailHotel', getDetailHotelController)

//get history booking
router.get('/getMyBooking', auth, myBookingController)

router.post('/changePassword', auth , changePasswordController)
router.post('/forgotPassword', forgotPasswordController)
router.post('/resetPassword/:id/:token', resetPasswordController)

// user profile
router.get('/getUserProfile', auth, getUserProfileController)
router.post('/editUser', auth, userEditController)


module.exports = router;