import React, { useEffect, useState } from "react";
import style from "./SignInUP.module.css";
import axios from "axios";



const SignIn = () => {


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",

  });

  const [isConnect, setIsConnect] = useState(false);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = { ...formData };
  //   console.log("user handleSubmit", user);
  //   // axios.get("http://localhost:5000/login/{formData.email}")
  //   axios.post("http://localhost:5000/api/signIn,user")

  //     // axios
  //     //   .get("http://localhost:5000/login/{formData.email}")
  //     .then((response) => {
  //       // Update the state with the data received from the API
  //       console.log("res", response);
  //       setIsConnect(true);
  //       const fullName = formData.email.split("@")[0].charAt(0).toUpperCase() + formData.email.split("@")[0].slice(1);
  //       setFormData({ ...formData, fullName: fullName });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.error("Error fetching data: ", error);
  //     });
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConnect(true);
    const fullName = formData.email.split("@")[0].charAt(0).toUpperCase() + formData.email.split("@")[0].slice(1);
    setFormData({ ...formData, fullName: fullName });
    console.log(`handleSubmit`);


    // Create reqdata with only email and password
    const reqdata = {
      email: formData.email,
      password: formData.password
    };


    console.log("user handleSubmit", reqdata);
    console.log(`user: ${reqdata}`);

    // Send the user data to the server
    try {

      const response = await axios.post(`http://localhost:5000/api/users/login`, reqdata); // Adjust the endpoint to /register
      console.log("User added successfully");
      console.log("Response:", response);

      // Optionally reset the form
      // setFormData({
      //   fullName: "",
      //   email: "",
      //   password: "",
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };





  return (
    <div className={style.container}>
      <div className={style.title}>
        Welcome {isConnect ? formData.fullName : ""} to HappinesFitness 😃
      </div>
      <p className={style.subtitle}>Please login with your details here:</p>


      <form onSubmit={handleSubmit}>
        <section>
          <div className={style.formGroup}>

            <label className={style.labelInput} htmlFor="email">Email Address  </label>
            <input className={style.input} placeholder="Enter your email address" name="email" type="text" value={formData.email} onChange={handleChange} />

            <label className={style.labelInput} htmlFor="Password">Password </label>
            <input className={style.input} type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />


          </div>
        </section>
        {/* <button type="sumbit" className={style.button}> SignIn</button> */}
        <button type="submit" className={style.button}> SignIn</button>

      </form>


      <div></div>

    </div>


  );
};
export default SignIn;