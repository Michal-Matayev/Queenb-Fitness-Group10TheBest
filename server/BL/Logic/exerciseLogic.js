// BL/Logic/exerciseLogic.js
const axios = require('axios');
const Exercise = require("../../DL/models/ExerciseModel");


// Function to fetch exercises from the API
async function fetchExercisesFromAPI() {
    try {
        const response = await axios.get('https://wger.de/api/v2/exercise/'); // Replace with actual API
        return response.data.results; // Assuming the exercises are inside results array
    } catch (error) {
        console.error('Error fetching exercises from API:', error);
        throw error;
    }
}

async function fetchAndSaveExercises() {
    try {
        const exercisesFromAPI = await fetchExercisesFromAPI();

        for (const exercise of exercisesFromAPI) {
            // Check if description is provided; set a default if not
            const description = exercise.description || 'No description available'; // Default value if missing

            const mappedExercise = {
                name: exercise.name,
                description, // Use the validated description
                category: exercise.category,
                targetMuscleGroups: exercise.muscles,
                duration: exercise.time || 30,
                difficulty: exercise.level ? exercise.level.toLowerCase() : 'easy', // Normalize difficulty
            };

            // Save each exercise to the database
            await Exercise.create(mappedExercise);
        }
    } catch (error) {
        console.error('Error adding exercises:', error);
        throw error;
    }

}

async function getAllExercises(filter) {
    const query = {};

    // Match difficulty if provided
    if (filter.difficulty) {
        query.difficulty = filter.difficulty; // Assuming 'difficulty' is a field in your model
    }

    // Match date if provided
    if (filter.date) {
        const date = new Date(filter.date);
        query.date = { $gte: date }; // Assuming 'date' is a field in your model
    }

    // Match other filters if provided (e.g., category, intensity, etc.)
    if (filter.category) {
        query.category = filter.category; // Assuming 'category' is a field in your model
    }

    // Add more filters as needed...

    return await Exercise.find(query);
}

module.exports = {
    getAllExercises,fetchAndSaveExercises
};

