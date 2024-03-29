const express = require("express");
const { requiredSignIn } = require("../controllers/userController");
const { addDiagnosticController, getMedicalRecords, deleteMedicalRecord } = require("../controllers/diagnosticController");
const medicalrecords = require('../models/diagnosticModel')


const router = express.Router();

//add record
router.post('/add-diagnostic', requiredSignIn, addDiagnosticController)

//get record
router.get('/get-diagnostic', requiredSignIn, getMedicalRecords)


router.delete('/delete-diagnostic/:id', deleteMedicalRecord)

module.exports = router;
