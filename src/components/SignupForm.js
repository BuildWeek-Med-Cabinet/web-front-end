import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { signupFormSchema } from "./formSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const DivLabel = styled.div`
    margin: 20px 0;
`
const DivButton = styled.div`
    backgoundColor: "green",
    padding: "5px 10px",
    margin: "10px 50%"
`

const initialFormValues = {
  username: "",
  email: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  email: "",
  password: "",
};

export default function SignupForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(false);

  const history = useHistory();

  // const postSignup = (newUser) => {
  //   axiosWithAuth()
  //     .post("https://med-cabinet-build-week.herokuapp.com/api/auth/register", newUser)
  //     .then((res) => {
  //       window.localStorage.setItem("token", res.data.token);
  //       history.push("/");
  //     })
  //     .catch((err) => {
  //       console.log("Error");
  //     });
  // };

  useEffect(() => {
    signupFormSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    Yup.reach(signupFormSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    axiosWithAuth()
      .post("https://med-cabinet-build-week.herokuapp.com/api/auth/register", newUser)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        history.push("/");
      })
      .catch((err) => {
        console.log("Error");
      });
    // postSignup(newUser);
  };

  return (
    <div>
      <form className="form2 container" onSubmit={onSubmit}>
        <div className="errors">
          <div>{formErrors.username}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
        </div>

        <div className="form-group inputs">
          <DivLabel>
            <label>
              Username&nbsp;
              <input
                value={formValues.username}
                onChange={onInputChange}
                name="username"
                type="text"
              />
            </label>
          </DivLabel>
          <DivLabel>
            <label>
              Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={formValues.email}
                onChange={onInputChange}
                name="email"
                type="email"
              />
            </label>
          </DivLabel>
          <DivLabel>
            <label>
              Password&nbsp;
              <input
                value={formValues.password}
                onChange={onInputChange}
                name="password"
                type="password"
              />
            </label>
          </DivLabel>
          <DivButton>
            <button disabled={disabled} >
              Submit
            </button>
          </DivButton>
        </div>
      </form>
    </div>
  );
}
