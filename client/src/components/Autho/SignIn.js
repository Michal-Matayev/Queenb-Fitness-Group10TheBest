import React from 'react'

import style from "./SignInUP.module.css";

const SignIn = () => {
  return (
      <div className={style.container}>
          <div className={style.title}>
              Welcome to HappinesFitness 😃 
          </div>
      <p className={style.subtitle}>Please login with your details here:</p>
      

      <form >
          <section>
          <div className={style.formGroup}>
            <label className={style.labelInput} htmlFor="email">Email Address </label>
            <input className={style.input} type="text" placeholder="Enter your email address"/>
        
            <label className={style.labelInput} htmlFor="Password">Password </label>
            <input className={style.input} type="text" placeholder="Enter your password"/>
                
            </div>
          </section>
            <button className={style.button}> SignIn</button>
      </form>
    
      
       <div></div>  
      
    </div>
      
      
      )
}
export default SignIn