const express = require('express')
const {
    loginController, 
    signupController,
    authController, 
    bookHotelController, 
    getAllNotiController,
    deleteAllNotiController,
    getDetailHotelController,
    deleteUserController,
    myBookingController,
    changePasswordController
} = require('../controller/userCtrl');
const auth = require('../middlewares/auth');

const router = express.Router();


router.post('/login', loginController)

router.post('/signup', signupController)
// router.post('/employeesignup', employeeSignupController)

router.post('/getUserData', auth, authController)

router.post('/bookHotel', auth, bookHotelController)

//Notification Hotel
router.post('/getNotification', auth, getAllNotiController)
router.post('/deleteNotification', auth, deleteAllNotiController)

//get detail hotels
router.get('/getDetailHotel', getDetailHotelController)
router.delete('/deleteUser/:id', auth, deleteUserController);

//get history booking
router.get('/getMyBooking/:id', auth, myBookingController)

router.post('/changePassword',auth , changePasswordController)

module.exports = router;