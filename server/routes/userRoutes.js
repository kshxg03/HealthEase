const express = require('express');
const { registerController, loginController, updateUserController, requiredSignIn } = require('../controllers/userController');

//router object
const router = express.Router()

//routes
//register || post
router.post('/register', registerController)

//login || post
router.post('/login', loginController)

//update || put
router.put('/update-user', requiredSignIn, updateUserController)

//export
module.exports = router