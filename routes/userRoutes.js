const express = require('express')
const {loginController, signupController, authController, dashboard} = require('../controller/userCtrl');
const auth = require('../middlewares/auth');

const router = express.Router();


router.post('/login', loginController)

router.post('/signup', signupController)

router.post('/getUserData', auth, authController)


module.exports = router;