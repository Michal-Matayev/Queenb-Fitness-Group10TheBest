const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    targetMuscleGroups: {
        type: [String],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'], // Valid values for difficulty
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
