import "./style.css";
import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const { setUserRegister } = useContext(UserContext);
  const [submitButton, setSubmitButton] = useState(false);
  const [Fields, setFields] = useState({ firstName: false, lastName: false, emailAdress: false, password: false });
  const navigate = useNavigate();




  function updateSignUpData(e) {
    e.preventDefault();
    const form = e.target,
      values = getDataForm(form);
    values.permission = "user";
    axios.post("http://localhost:5000/register", values).then((res) => {
      console.log(res.data);
      console.log(values);
      form.reset();
      setUserRegister(values);
      props.setUserStatus({ newUser: false });
      navigate("/userPage");


    });
  }

  function getDataForm(form) {
    return Object.values(form).reduce((acc, curr) => {
      let { value, name } = curr;
      return name ? { ...acc, [name]: value } : acc;
    }, {});
  }

  function handleChange(e) {
    if (e.target.value != '') {
      setFields({ ...Fields, [e.target.name]: true });
      if (Object.values(Fields).every((element) => element == true))
        setSubmitButton(true);
    }
    else {
      setFields({ ...Fields, [e.target.name]: false });

    }
  }


  return (
    <form onSubmit={updateSignUpData} autocomplete="off">
      <div >
        <h4 className="headerText">Join Us Today</h4>
        <div className="inputSectionSplit">
          <input
            type="text"
            className="firstName"
            name="firstName"
            required
            placeholder="First Name"
            onChange={handleChange}

          />
        </div>
        <div className="inputSectionSplit">
          <input
            type="text"
            className="lastName"
            name="lastName"
            required
            placeholder="Last Name"
            onChange={handleChange}

          />
        </div>
        <div className="inputSection">
          <input
            type="text"
            className="emailAddress"
            name="emailAdress"
            required
            placeholder="Email Address"
            onChange={handleChange}

          />
        </div>
        <div className="inputSection">
          <input
            type="text"
            className="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleChange}

          />
        </div>
        <div className="formFooter">
          <button type="submit" className="saveForm" disabled={!submitButton}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

