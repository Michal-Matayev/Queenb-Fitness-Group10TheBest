const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    lastSeen: {
        type: Date,
    },
    token: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);
