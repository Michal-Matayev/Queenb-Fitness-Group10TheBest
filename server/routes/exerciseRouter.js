const express = require('express');
const router = express.Router();
const exerciseController = require('../DL/Controllers/exerciseController'); // Adjust the path based on your file structure


// Route to fetch and add exercises to the database
router.get('/fetch-exercises', async (req, res) => {
    try {
        await exerciseController.addExercises();
        res.status(200).send('Exercises fetched and added to database.');
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exercises', error: error.message });
    }
});

// Route to get all exercises with optional filters
router.get('/', async (req, res) => {
    try {
        const filters = {
            difficulty: req.query.difficulty,
            date: req.query.date,
            category: req.query.category, // Add more filters as needed
        };
        const exercises = await exerciseController.getAllExercises(filters);
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving exercises', error: error.message });
    }
});

// Export the router
module.exports = router;