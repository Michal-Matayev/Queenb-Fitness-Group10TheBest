import React from 'react'
import style from "./SignInUP.module.css";

const SignUp = () => {
  return (
      <div className={style.container}>
          <div className={style.title}>
              Welcome to HappinessFitness 😃 
          </div>

          <span className={style.subtitle}>Please login with your details here:</span>
    
          <form >
          <section>
            <div className={style.formGroup}>

            <label  className={style.labelInput} htmlFor="fullName">Full Name </label>
            <input type="text" placeholder="Enter your full name" className={style.input}/>          

            <label  className={style.labelInput} htmlFor="email">Email Address </label>
            <input type="text" placeholder="Enter your email address" className={style.input}/>
        
            <label  className={style.labelInput} htmlFor="password">Password </label>
            <input type="password" placeholder="Enter your password" className={style.input}/>
                
            
            </div>
          </section>
            <button className={style.button}> SignUp</button>
      </form>

          
       <div></div>  
      
    </div>
      
      
      )
}

export default SignUp