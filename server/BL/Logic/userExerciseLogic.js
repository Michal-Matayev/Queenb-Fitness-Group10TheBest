const UserExercise = require("../../DL/models/UserExerciseModel");

// Add a new user exercise
async function addUserExercise(userExerciseData) {
    try {
        const userExercise = new UserExercise(userExerciseData);
        await userExercise.save();
        return userExercise;
    } catch (error) {
        throw new Error(`Error adding exercise: ${error.message}`);
    }
}

// Get all exercises for a specific user
async function getAllUserExercises(userId) {
    try {
        const exercises = await UserExercise.find({ userId })
            .populate('exerciseId', 'name description') // Populate exercise details
            .exec();
        return exercises;
    } catch (error) {
        throw new Error(`Error fetching user exercises: ${error.message}`);
    }
}

// Filter user exercises based on various criteria
async function filterUserExercises(userId, filters) {
    try {
        const query = { userId };

        if (filters.difficulty) {
            console.log(filters.difficulty);
            query.difficulty = filters.difficulty;
        }
        if (filters.startDate && filters.endDate) {
            query.date = { $gte: filters.startDate, $lte: filters.endDate };
        }

        const exercises = await UserExercise.find(query)
            .populate('exerciseId', 'name description') // Populate exercise details
            .exec();
        return exercises;
    } catch (error) {
        throw new Error(`Error filtering user exercises: ${error.message}`);
    }
}

module.exports = {
    addUserExercise,
    getAllUserExercises,
    filterUserExercises,
};
