import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const ExerciseListContainer = styled.div`
  background-image: url('exercise2back.jpg');
  background-size: cover;
  background-position: center;
  min-height: 60vh;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const FilterOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;

  span {
    margin-right: 10px;
    font-weight: bold;
    font-size: 1rem;
  }

  select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    width: 150px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    select {
      margin-bottom: 10px;
      width: 100%;
    }
  }
`;

const ExerciseListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExerciseCard = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }

  h2 {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: #007bff;
  }

  p {
    margin: 5px 0;
    color: #666;
    font-size: 1rem;
  }

  .difficulty {
    color: #28a745;

    &.easy {
      color: #28a745;
    }

    &.medium {
      color: #ffc107;
    }

    &.hard {
      color: #dc3545;
    }
  }

  .favorite-icon {
    cursor: pointer;
    font-size: 1.5rem;
    color: #dc3545; // Default color for unfavorite
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .favorite {
    color:  #dc3545; // Change color when favorite
  }
`;

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [favorites, setFavorites] = useState(new Set()); // State to track favorites

  const getRandomDifficulty = () => {
    const difficulties = ['easy', 'medium', 'hard'];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  };

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/exercises'); // Ensure this endpoint returns exercises
      // Randomly assign difficulty to each exercise
      const updatedExercises = response.data.map((exercise) => ({
        ...exercise,
        difficulty: getRandomDifficulty(), // Assign random difficulty
      }));
      setExercises(updatedExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises(); // Fetch all exercises initially
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedDifficulty(e.target.value); // Set the selected difficulty without calling the API
  };

  // Toggle favorite status
  const toggleFavorite = (exerciseId) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(exerciseId)) {
      updatedFavorites.delete(exerciseId); // Remove from favorites
    } else {
      updatedFavorites.add(exerciseId); // Add to favorites
    }
    setFavorites(updatedFavorites);
  };

  // Filter exercises based on selected difficulty
  const filteredExercises = exercises.filter((exercise) => {
    if (!selectedDifficulty) return true; // Show all if no filter is selected
    return exercise.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();
  });

  // Sort exercises based on selected sort option
  const sortedExercises = [...filteredExercises].sort((a, b) => {
    // Prioritize favorites
    const isAFavorite = favorites.has(a.id); // Assuming each exercise has a unique id
    const isBFavorite = favorites.has(b.id);

    if (isAFavorite && !isBFavorite) return -1; // a is a favorite, b is not
    if (!isAFavorite && isBFavorite) return 1; // b is a favorite, a is not

    const nameA = a.name?.toLowerCase() || '';
    const nameB = b.name?.toLowerCase() || '';

    if (sortOption === 'z-a') {
      return nameA.localeCompare(nameB); // Sort alphabetically A-Z
    }

    if (sortOption === 'a-z') {
      return nameB.localeCompare(nameA); // Sort alphabetically Z-A
    }

    return 0; // Default: no sorting
  });

  return (
    <ExerciseListContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Overlay>
          <h1>Exercises</h1>

          <FilterOptions>
            <div>
              <span>Filter by difficulty:</span>
              <select onChange={handleFilterChange} value={selectedDifficulty}>
                <option value="">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <span>Sort by:</span>
              <select onChange={handleSortChange} value={sortOption}>
                <option value="">Sort</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </FilterOptions>

          <ExerciseListGrid>
            {sortedExercises.length === 0 ? (
              <p>No exercises found for the selected difficulty.</p> // Display message when no exercises match the filter
            ) : (
              sortedExercises.map((exercise) => (
                <ExerciseCard key={exercise.id}>
                  <h2>{exercise.name}</h2>
                  <p><strong>Description:</strong> {exercise.description}</p>
                  <p><strong>Category:</strong> {exercise.category}</p>
                  <p><strong>Target Muscle Groups:</strong> {exercise.targetMuscleGroups.join(', ') || 'None'}</p>
                  <p><strong>Duration:</strong> {exercise.duration} minutes</p>
                  <p className={`difficulty ${exercise.difficulty?.toLowerCase() || ''}`}>
                    <strong>Difficulty:</strong> {exercise.difficulty || 'medium'}
                  </p>
                  <div
                    className={`favorite-icon ${favorites.has(exercise.id) ? 'favorite' : ''}`} // Toggle favorite styling
                    onClick={() => toggleFavorite(exercise.id)} // Call toggleFavorite on click
                  >
                    {favorites.has(exercise.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                  </div>
                </ExerciseCard>
              ))
            )}
          </ExerciseListGrid>
        </Overlay>
      )}
    </ExerciseListContainer>
  );
};

export default ExerciseList;
