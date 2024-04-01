const diagnosticModel = require("../models/diagnosticModel")


//add
const addDiagnosticController = async (req, res) => {
    const record = new diagnosticModel({
        type: req.body.type,
        value: req.body.value,
        unit: req.body.unit,
        postedBy: req.auth._id,
    });

    try {
        const newRecord = await record.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// GET all medical records
const getMedicalRecords = async (req, res) => {
    try {
        const records = await diagnosticModel.find({ postedBy: req.auth._id });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Route to delete a medical record
const deleteMedicalRecord = async (req, res) => {
    try {
        const record = await diagnosticModel.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addDiagnosticController, getMedicalRecords, deleteMedicalRecord }