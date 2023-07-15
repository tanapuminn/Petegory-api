const express = require('express')
const auth = require('../middlewares/auth')
const {getAllUsersController, getAllEmployeeController} = require('../controller/adminCtrl')

const router = express.Router();

router.get('/getAllUsers', auth, getAllUsersController)

router.get('/getAllEmployees', auth, getAllEmployeeController)

module.exports = router;