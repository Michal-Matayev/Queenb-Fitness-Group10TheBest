// DL/Controllers/exerciseController.js
const exerciseLogic = require("../../BL/Logic/exerciseLogic");

const addExercises = async () => {
    try {
        await exerciseLogic.fetchAndSaveExercises(); // Ensure this function is defined in exerciseLogic
    } catch (error) {
        console.error('Error in controller:', error);
        throw new Error('Error adding exercises'); // Consider returning a response instead of throwing an error
    }
};

// Function to get all exercises with optional filters
const getAllExercises = async (filters) => {
    try {
        return await exerciseLogic.getAllExercises(filters);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw new Error('Error retrieving exercises'); // Consider returning a response instead of throwing an error
    }
};

// Export all functions
module.exports = {
    addExercises,
    getAllExercises,
    // Include other functions as needed
};