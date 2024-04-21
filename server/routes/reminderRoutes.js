const express = require("express");
const { requiredSignIn } = require("../controllers/userController");
const { addReminderController, getUserRemindersController, deleteReminderController } = require("../controllers/pillReminderController");



const router = express.Router();


//add record
router.post('/add-reminder', requiredSignIn, addReminderController)

//get record
router.get('/get-reminder', requiredSignIn, getUserRemindersController)

router.delete('/delete-reminder/:id', deleteReminderController);


module.exports = router;