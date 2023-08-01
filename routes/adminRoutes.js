const express = require('express')
const auth = require('../middlewares/auth')
const multer = require('multer')
const path = require('path')
const {
    getAllUsersController, 
    getAllEmployeeController,
    createHotelController,
    getHotelController
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


module.exports = router;