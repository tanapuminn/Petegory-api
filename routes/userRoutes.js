const express = require('express')
const {
    loginController, 
    signupController, 
    authController, 
    bookHotelController, 
    getAllNotiController,
    deleteAllNotiController,
    getDetailHotelController
} = require('../controller/userCtrl');
const auth = require('../middlewares/auth');

const router = express.Router();


router.post('/login', loginController)

router.post('/signup', signupController)

router.post('/getUserData', auth, authController)

router.post('/bookHotel', auth, bookHotelController)

//Notification Hotel
router.post('/getNotification', auth, getAllNotiController)
router.post('/deleteNotification', auth, deleteAllNotiController)

//get detail hotels
router.get('/getDetailHotel', getDetailHotelController)


module.exports = router;