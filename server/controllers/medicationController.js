const medicationModel = require("../models/medicationModel")

const addMedicationController = async (req, res) => {
    const record = new medicationModel({
        name: req.body.name,
        dosage: req.body.dosage,
        postedBy: req.auth._id,
    });
    try {
        const newRecord = await record.save()
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// GET all medical records
const getMedicationRecords = async (req, res) => {
    try {
        const records = await medicationModel.find({ postedBy: req.auth._id });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Route to delete a medical record
const deleteMedicationRecord = async (req, res) => {
    try {
        const record = await medicationModel.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addMedicationController, getMedicationRecords, deleteMedicationRecord }