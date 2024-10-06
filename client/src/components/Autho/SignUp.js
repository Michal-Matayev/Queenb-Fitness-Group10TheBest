
import React, { useState } from "react";
import style from "./SignInUP.module.css";
import axios from "axios";

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = { ...formData };
  //   console.log("user handleSubmit", user);
  //   // axios.get("http://localhost:5000/login/{formData.email}")
  //   axios.post(`http://localhost:5000/api/signUp`, user)

  //     // axios
  //     //   .get("http://localhost:5000/login/{formData.email}")
  //     .then((response) => {
  //       // Update the state with the data received from the API
  //       console.log("res", response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.error("Error fetching data: ", error);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`handleSubmit`);

    // Assume formData has the fullName field
    const { fullName, ...rest } = formData; // Destructure fullName from formData

    // Split the full name into first name and last name
    const names = fullName.trim().split(" "); // Trim whitespace and split by space
    const firstName = names[0]; // First name
    const lastName = names.length > 1 ? names.slice(1).join(" ") : ""; // Last name

    // Create user object to send to the server
    const user = {
      firstName,  // Add first name
      lastName,   // Add last name
      ...rest     // Include the rest of the user data
    };



    console.log("user handleSubmit", user);
    console.log(`user: ${user}`);

    // Send the user data to the server
    try {

      const response = await axios.post(`http://localhost:5000/api/users/register`, user); // Adjust the endpoint to /register
      console.log("User added successfully");
      console.log("Response:", response);
      setIsRegistered(true);
      // Optionally reset the form
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Please insert you'r full name-> first name and family name")
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        {isRegistered ? `Welcome ${formData.fullName} You have successfully registered ` : "Welcome to HappinesFitness"} 😃
      </div>

      <span className={style.subtitle}>Please login with your details here:</span>

      <form onSubmit={handleSubmit} >
        <section>
          <div className={style.formGroup}>

            <label className={style.labelInput} htmlFor="fullName">Full Name </label>
            <input className={style.input} placeholder="Enter your full name" name="fullName" type="text" value={formData.fullName} onChange={handleChange} />

            <label className={style.labelInput} htmlFor="email">Email Address </label>
            <input className={style.input} placeholder="Enter your email address" name="email" type="text" value={formData.email} onChange={handleChange} />

            <label className={style.labelInput} htmlFor="password">Password </label>
            <input className={style.input} type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />


          </div>
        </section>
        <button type="submit" className={style.button}> SignUp</button>
      </form>


      <div></div>

    </div>


  );
};

export default SignUp;