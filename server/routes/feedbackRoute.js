const express = require('express');
const { requiredSignIn } = require("../controllers/userController");
const { addFeedbackController } = require('../controllers/feedbackController')

//router object
const router = express.Router()

router.post('/add-feedback', requiredSignIn, addFeedbackController);

module.exports = router;