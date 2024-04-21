const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: String, required: true },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Reminder', reminderSchema);