import React, { useEffect, useState } from "react";
import style from "./SignInUP.module.css";
import axios from "axios";



const SignIn = () => {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  
  
  });
  
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.email]: e.target.value , [e.target.password]: e.target.value },
      
  //   );
    
  // };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios.get("http://localhost:5000/login/{formData.email}")
    axios.get(`http://localhost:5000/login/${formData.email}`)

      // axios
      //   .get("http://localhost:5000/login/{formData.email}")
      .then((response) => {
        // Update the state with the data received from the API
        console.log("res", response)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  



  return (
      <div className={style.container}>
          <div className={style.title}>
              Welcome to HappinesFitness 😃 
          </div>
      <p className={style.subtitle}>Please login with your details here:</p>
      

      <form onSubmit={handleSubmit}>
          <section>
          <div className={style.formGroup}>

            <label className={style.labelInput} htmlFor="email">Email Address  </label>
            <input className={style.input} placeholder="Enter your email address" name="email" type="text" value={formData.email} onChange={handleChange}/>
        
            <label className={style.labelInput} htmlFor="Password">Password </label>
            <input className={style.input} type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />

                
            </div>
          </section>
            {/* <button type="sumbit" className={style.button}> SignIn</button> */}
            <button type="submit" className={style.button}> SignIn</button>

      </form>
    
      
       <div></div>  
      
    </div>
      
      
      )
}
export default SignIn