const express = require("express");
const { requiredSignIn } = require("../controllers/userController");
const { addMedicationController } = require("../controllers/medicationController");
const { getMedicationRecords } = require("../controllers/medicationController");
const { deleteMedicationRecord } = require("../controllers/medicationController");

const router = express.Router();


//add record
router.post('/add-medication', requiredSignIn, addMedicationController)

//get record
router.get('/get-medication', requiredSignIn, getMedicationRecords)

//delete
router.delete('/delete-medication/:id', deleteMedicationRecord)

module.exports = router;
