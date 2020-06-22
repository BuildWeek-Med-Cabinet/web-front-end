import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { object, string } from "yup";

const initialState = {
  first_name: "",
  last_name: "",
  username: "",
  password: "",
};

const SignUp = (props) => {
  const history = useHistory();

  const [newUser, setNewUser] = useState(initialState);
  const schema = object().shape({
    first_name: string().required("First Name is required"),
    last_name: string().required("Last Name is required"),
    username: string().required("Username is required"),
    password: string().required("Password is required"),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("", newUser)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div classNAme="wrapper">
          <div className="first-name">
            <input
              required
              name="first_name"
              error={!!errors.first_name}
              type="text"
              inputRef={register}
              onChange={handleChange}
            />
            <span>{errors.first_name ? errors.first_name.message : ""}</span>
          </div>
          <div className="last-name">
            <input
              required
              name="last_name"
              error={!!errors.last_name}
              type="text"
              inputRef={register}
              onChange={handleChange}
            />
          </div>
          <span>{errors.last_name ? errors.last_name.message : ""}</span>
          <div className="username">
            <input
              required
              name="username"
              error={!!errors.username}
              type="email"
              inputRef={register}
              onChange={handleChange}
            />
            <span>{errors.username ? errors.username.message : ""}</span>
          </div>
          <div className="password">
            <input
              required
              name="password"
              error={!!errors.password}
              label="Password"
              inputRef={register}
              type="password"
              onChange={handleChange}
            />
            <span>{errors.password ? errors.password.message : ""}</span>
          </div>
          <div className="btn">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
