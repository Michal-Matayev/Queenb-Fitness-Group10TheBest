import React, { useState } from "react";

import styles from "./Authentication.module.css";
import SignIn from "../../components/Autho/SignIn";
import SignUp from "../../components/Autho/SignUp";


const Authentication = () => {
  const [login, setLogin] = useState(false);


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="dumbbells.jpg" alt="dumbbellsPicture" className={styles.image} />
      </div>
      <div className={styles.right}>
        {!login ? (
          <>
            <SignIn />
            <div className={styles.text}>
              Don't have an account?{" "}
              <div className="textButton" onClick={() => setLogin(true)}>
                SignUp
              </div>
            </div>
          </>
        ) : (
          <>
            <SignUp />
            <div className={styles.text}>
              Already have an account?{" "}
              <span className="textButton" onClick={() => setLogin(false)}>
                SignIn
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;
