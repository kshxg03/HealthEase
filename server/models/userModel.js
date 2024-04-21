const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'please add first-name'],
        unique: false,
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, 'please add last-name'],
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'please add email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 40,
    },
    role: {
        type: String,
        default: 'user',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);