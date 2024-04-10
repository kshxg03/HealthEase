const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    feedback: String,
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Feedback', feedbackSchema);
