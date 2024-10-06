// DL/Controllers/exerciseController.js
// const exerciseLogic = require("../../BL/Logic/exerciseLogic");
const UserExercise = require("../models/UserExerciseModel");

const userExerciseLogic = require("../../BL/Logic/UserExerciseLogic");

// Get all user exercises
async function getAllUserExercises(req, res) {
    const { userId } = req.params;
    try {
        const exercises = await userExerciseLogic.getAllUserExercises(userId);
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Add user exercise
async function addUserExercise(req, res) {
    try {
        const userExercise = await userExerciseLogic.addUserExercise(req.body);
        res.status(201).json(userExercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Filter user exercises
async function filterUserExercises(req, res) {
    const { userId } = req.params;
    const filters = req.query; // Adjust according to how you want to filter
    try {
        const exercises = await userExerciseLogic.filterUserExercises(userId, filters);
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUserExercises,
    addUserExercise,
    filterUserExercises,
};
