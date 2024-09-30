import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ExerciseListContainer = styled.div`
  background-image: url('exercise2back.jpg'); /* נתיב לתמונה */
  background-size: cover; /* כיסוי מלא */
  background-position: center; /* מיקום במרכז */
  min-height: 60vh; /* גובה מינימלי של הקונטיינר */
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.8); /* שכבה חצי שקופה */
  padding: 30px;
  border-radius: 15px;
  text-align: center;
`;

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
          headers: {
            'X-RapidAPI-Key': '1cd1cc3b26msh81271c8322624d2p1a694fjsn39bc88b2c3dd',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = selectedCategory
    ? exercises.filter(exercise => exercise.bodyPart === selectedCategory)
    : exercises;

  const sortedExercises = filteredExercises.sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <ExerciseListContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Overlay>
          <h1>Exercises</h1>
          <div className="filter-options">
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              <option value="back">Back</option>
              <option value="chest">Chest</option>
              <option value="shoulders">Shoulders</option>
            </select>
            <select onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Sort</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          <div className="exercise-list">
            {sortedExercises.map((exercise, index) => (
              <div key={index} className="exercise-card">
                <h2>{exercise.name}</h2>
                <p>{exercise.bodyPart}</p>
              </div>
            ))}
          </div>
        </Overlay>
      )}
    </ExerciseListContainer>
  );
};

export default ExerciseList;
