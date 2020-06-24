import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  username: "",
  password: "",
};

const Login = (props) => {
  const history = useHistory();

  const [credential, setCredential] = useState(initialState);

  const schema = object().shape({
    username: string().required("Username is required"),
    password: string().required("Password is required"),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("", credential)
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
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-wrapper">
          <h3>Username</h3>
          <input
            required
            className="input"
            name="username"
            error={!!errors.username}
            type="email"
            inputRef={register}
            onChange={handleChange}
          />
          <span>{errors.username ? errors.username.message : ""}</span>
        </div>
        <div className="password">
          <h3>Password</h3>
          <input
            required
            name="password"
            error={!!errors.password}
            inputRef={register}
            type="password"
            onChange={handleChange}
          />
          <span>{errors.password ? errors.password.message : ""}</span>
        </div>
        <div className="btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
