const express = require('express')
const auth = require('../middlewares/auth')
const multer = require('multer')
const path = require('path')
const {
    getAllUsersController, 
    getAllEmployeeController,
    createHotelController,
    getHotelController,
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
} = require('../controller/adminCtrl')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'C:/programing/fullstack/projectdraft/petegory/public/images')
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.get('/getAllUsers', auth, getAllUsersController)

router.get('/getAllEmployees', auth, getAllEmployeeController)

router.post('/createHotels', auth, upload.single('filename'), createHotelController);

router.get('/getHotels', auth, getHotelController)
router.delete('/deleteHotels/:id', auth, deleteHotelsController)

router.get('/getBookingHistory', auth, sendBookingHistory)

router.get('/getUserCount', auth, getUserCountController)
router.get('/getBookHotelCount', auth, getBookHotelCountController)
router.get('/getBookGroomingCount', auth, getBookGroomingCountController)

//Booking Grooming
router.get('/allBookedGrooming', auth, getAllbookingGroomingController)
router.delete('/deleteBookedGrooming/:id', auth, deleteBookedGroomingController)

router.post('/changeStatus', auth, changeStatusController)
router.post('/statusBookHotel', auth, statusBookHotelController)
router.post('/statusBookGrooming', auth, statusBookGroomingController)


router.get('/editUser/:id', auth, editUserController)
router.put('/updateUser/:id', auth, updateUserController)
router.delete('/deleteUser/:id', auth, deleteUserController);

router.get('/editEmployee/:id', auth, editEmployeeController)
router.put('/updateEmployee/:id', auth, updateEmployeeController)

//Booking Hotel
router.get('/allBookedHotel', auth, getAllbookingHotelsController)
router.get('/editBookHotel/:id', auth, editBookHotelController)
router.put('/updateBookHotel/:id', auth, updateBookHotelController)
router.delete('/deleteBookHotel/:id', auth, deleteBookHotelController)


module.exports = router;