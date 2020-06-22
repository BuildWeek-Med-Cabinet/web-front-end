import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import axios from 'axios';

const initialState = {
  username: "",
  password: ""
};

const Login = props => {

  const history = useHistory();

  const [credential, setCredential] = useState(initialState);
  
  const schema = object().shape({
    username: string().required("Username is required"),
    password: string().required("Password is required")
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const handleChange = e => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
    .post("", credential)
    .then(res => {
      console.log(res);
      window.localStorage.setItem("token", res.data.payload);
      history.push("/");
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='Wrapper'>
          <div className='wrapper'>
            <input
              className='input'
              name="username"
              error={!!errors.username}
              type="email"
              inputRef={register}
              onChange={handleChange}
            />
            <span>{errors.username ? errors.username.message : ""}</span>
          </div>
          <div className='password'>
            <input
              name="password"
              error={!!errors.password}
              inputRef={register}
              type="password"
              onChange={handleChange}
            />
            <span>{errors.password ? errors.password.message : ""}</span>
          </div>
          <div className='btn'>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login