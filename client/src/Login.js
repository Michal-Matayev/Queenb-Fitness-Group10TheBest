import React from 'react';
import './Login.css';
import logo from './images/LogoFitness.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="header">
       <img src={logo} alt="App Logo" className="logo"/>
        {/* <button className="login-register-button">Login/Register</button> */}
      </div>

     <div>
          <h1 className="login-title">Log In</h1>
     </div>


      <div className="login-box">
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <a href="/forget-password" className="forget-password-link">Forget Password</a>

        <button className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
