const mongoose = require('mongoose');

// Define a schema for health records
const healthRecordSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    bloodPressure: String,
    uricAcid: String,
    vitaminD: String,
    magnesium: String,
    vitaminB12: String,
    fastingBloodGlucose: String,
    lipidProfile: String,
    cbc: String,
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

module.exports  = mongoose.model('HealthRecord', healthRecordSchema);