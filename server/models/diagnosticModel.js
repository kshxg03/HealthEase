const mongoose = require('mongoose')

const diagnosticSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('medicalrecords', diagnosticSchema)