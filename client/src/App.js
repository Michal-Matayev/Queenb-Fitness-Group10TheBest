import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import Authentication from './pages2/Authentication/Authentication';
import ExerciseList from './components/Exercises/ExerciseList';
// import { Sign } from 'crypto';

function App() {

  // const [user, setUser] = useState(true);
  return (
    <BrowserRouter>
      
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src="/LogoFitness.png" alt="Logo" className={styles.appLogo} />

          
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            <Link to="/logIn" className={styles.appLink}>LogIn</Link>
            <Link to="/exercises" className={styles.appLink}>Exercises</Link>

          </nav>
        </header>
        <main className={styles.main}>
          <Routes>

            <Route path="/exercises" element={<ExerciseList/>} />

            <Route path="/logIn" element={<Authentication/>}/>

            <Route path="/" element={<Home />} />


            
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
