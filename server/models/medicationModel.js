// models/Medication.js
const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Medication', medicationSchema);
