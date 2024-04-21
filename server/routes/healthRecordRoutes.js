const express = require('express');
const { requiredSignIn } = require("../controllers/userController");
const { addRecordController, getRecordController, deleteRecordConroller } = require('../controllers/healthRecordController');
const { deleteMedicationRecord } = require('../controllers/medicationController');


const router = express.Router();

// Route to save health record data
router.post('/health-record', requiredSignIn ,addRecordController)

// Route to fetch all health records
router.get('/get-health-records', requiredSignIn, getRecordController)

//delete
router.delete('/delete-record/:id', deleteRecordConroller)

module.exports = router;
