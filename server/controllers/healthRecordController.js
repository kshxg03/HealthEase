const HealthRecord = require('../models/healthRecordModel');

const addRecordController = async (req, res) => {
    try {
        const { name, age, gender, bloodPressure, uricAcid, vitaminD, magnesium, vitaminB12, fastingBloodGlucose, lipidProfile, cbc } = req.body;

        // Save health record data to MongoDB
        const healthRecord = new HealthRecord({
            name,
            age,
            gender,
            bloodPressure,
            uricAcid,
            vitaminD,
            magnesium,
            vitaminB12,
            fastingBloodGlucose,
            lipidProfile,
            cbc,
            postedBy: req.auth._id,

        });
        await healthRecord.save();

        res.status(200).json({ message: 'Health record saved, you can view it in Health Reports!' });
    } catch (error) {
        console.error('Error saving health record:', error);
        res.status(500).json({ message: 'Failed to save health record' });
    }
};

const getRecordController = async (req, res) => {
    try {
        const records = await HealthRecord.find( {postedBy: req.auth._id} );
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching health records:', error);
        res.status(500).json({ message: 'Failed to fetch health records' });
    }
};

// Route to delete a medical record
const deleteRecordConroller = async (req, res) => {
    try {
        const record = await HealthRecord.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {addRecordController, getRecordController, deleteRecordConroller};