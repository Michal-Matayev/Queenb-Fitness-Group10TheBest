import "./style.css";
import React from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignIn() {
  const { state } = useLocation();
  const [error, setError] = useState(false);
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [submitButton, setSubmitButton] = useState(false);
  const [Fields, setFields] = useState({ email: false, password: false });
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { token, setToken } = useContext(UserContext);

  function updateSignInData(e) {
    e.preventDefault();
    const form = e.target,
      values = getDataForm(form);
    axios
      .post("http://localhost:5000/signin", values) // Change route to `signin`
      .then((result) => {
        console.log(result);
        if (result.data.status === 400) {
          console.log("error");
          return setError(true);
        }
        form.reset();
        setUserLogin(result.data);
        sessionStorage.setItem("token", result.data.token);
        setToken(result.data.token);

        if (state && state.nextPage === '-1') navigate(-1);
        else navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setError(true); // Handle error case
      });
  }

  function getDataForm(form) {
    return Object.values(form).reduce((acc, curr) => {
      let { value, name } = curr;
      return name ? { ...acc, [name]: value } : acc;
    }, {});
  }

  function handleChange(e) {
    if (e.target.value !== "") {
      setFields({ ...Fields, [e.target.name]: true });
      if (Object.values(Fields).every((element) => element)) setSubmitButton(true);
    } else {
      setFields({ ...Fields, [e.target.name]: false });
    }
  }

  return (
    <form onSubmit={updateSignInData} autoComplete="off">
      <div className="signInContainer">
        {context.userRegister ? (
          <h5 className="headerText colorText">
            The registration process was successful!
            <br />
            Now log in
          </h5>
        ) : (
          <h4 className="headerText">Welcome Back</h4>
        )}

        <div className="inputSection">
          <input
            onChange={handleChange}
            type="text"
            className="userName"
            required
            placeholder="User Name"
            name="email"
          />
        </div>
        <div className="inputSection">
          <input
            onChange={handleChange}
            type="password"
            className="password"
            required
            placeholder="Password"
            name="password"
          />
        </div>
        <div>{error && <p className="error">Email or password invalid</p>}</div>
        <div className="formFooter">
          <button type="submit" className="saveForm" disabled={!submitButton}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
