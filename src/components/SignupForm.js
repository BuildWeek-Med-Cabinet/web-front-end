import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { signupFormSchema } from "./formSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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

  const postSignup = (newUser) => {
    axiosWithAuth()
      .post(
        "https://med-cabinet-build-week.herokuapp.com/api/auth/register",
        newUser
      )
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        history.push("/login");
      })
      .catch((err) => {
        console.log("Error");
      });
  };

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

    postSignup(newUser);
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
          <div style={{ margin: "20px 0", padding: "0px" }}>
            <label>
              Username&nbsp;
              <input
                style={{ margin: "0", padding: "0px" }}
                value={formValues.username}
                onChange={onInputChange}
                name="username"
                type="text"
              />
            </label>
          </div>
          <div style={{ margin: "20px 0", padding: "0px" }}>
            <label style={{ margin: "0", padding: "0px" }}>
              Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                style={{ margin: "0" }}
                value={formValues.email}
                onChange={onInputChange}
                name="email"
                type="email"
              />
            </label>
          </div>
          <div style={{ margin: "20px 0" }}>
            <label style={{ margin: "0" }}>
              Password&nbsp;
              <input
                style={{ margin: "0" }}
                value={formValues.password}
                onChange={onInputChange}
                name="password"
                type="password"
              />
            </label>
          </div>
          <div>
            <button
              style={{ padding: "5px 10px", margin: "10px 50%" }}
              disabled={disabled}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
