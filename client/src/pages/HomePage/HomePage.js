import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <img src="exercise-woman-running.jpg" alt="backgroundRunWoman" className={styles.image} />

        {/* כיתוב על גבי התמונה */}
        <div className={styles.textContainer}>
          <h1 className={styles.headline}>Be Healthy On The Way To Happiness</h1>
          <h2 className={styles.subheadline}>The Benefits of Fitness</h2>
          <div className={styles.benefits}>
            <div className={styles.benefitItem}>1. Boosts Energy Levels - Enhances stamina and reduces fatigue.</div>
            <div className={styles.benefitItem}>2. Improves Heart Health - Strengthens the cardiovascular system.</div>
            <div className={styles.benefitItem}>3. Supports Weight Management - Helps control weight and body fat.</div>
            <div className={styles.benefitItem}>4. Reduces Stress - Releases endorphins, promoting relaxation.</div>
            <div className={styles.benefitItem}>5. Increases Strength and Flexibility - Builds muscles and improves mobility.</div>
            <div className={styles.benefitItem}>6. Enhances Mental Focus - Sharpens cognitive function and memory.</div>
            <div className={styles.benefitItem}>7. Promotes Better Sleep - Regulates sleep patterns for deeper rest.</div>
            <div className={styles.benefitItem}>...and more!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
