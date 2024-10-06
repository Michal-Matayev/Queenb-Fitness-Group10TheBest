const express = require('express');
const router = express.Router();
const userExerciseController = require('../DL/Controllers/userExerciseController'); // Adjust the path based on your file structure


// Route to get all exercises for a user
router.get('/:userId/exercises', userExerciseController.getAllUserExercises);

// Route to add a user exercise
router.post('/exercises', userExerciseController.addUserExercise); // This line is causing the error

// Route to filter user exercises
router.get('/:userId/exercises/filter', userExerciseController.filterUserExercises);

module.exports = router;