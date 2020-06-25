import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { signupFormSchema } from "./formSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";


const DivFormGroup = styled.div`
    width: 30%;
    margin: 200px 35% 0;
    padding: 0 10px;
    border: 1px solid #173d53;
    background-color: #25b3a7;
    color: #173d53;
    border-radius: 5px;
`

const DivLabel = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
`
const DivButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    backgoundColor: "green";
    padding: "20px 10px";
    margin: "0px auto";
`

const Button = styled.button`
    margin: 10px auto;
    font-size: 1.2rem;
    padding: 2px 10px;
`

const Label = styled.label`
  font-size: 1.5rem;
  margin: 0px auto;
  width: 100%;
  display: flex;
  justify-content: center;
`
const Input = styled.input`
    width: 60%;
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

        <DivFormGroup>
          <DivLabel>
            <Label>
              Username&nbsp;
              <Input
                value={formValues.username}
                onChange={onInputChange}
                name="username"
                type="text"
              />
            </Label>
          </DivLabel>
          <DivLabel>
            <Label>
              Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input
                value={formValues.email}
                onChange={onInputChange}
                name="email"
                type="email"
              />
            </Label>
          </DivLabel>
          <DivLabel>
            <Label>
              Password&nbsp;
              <Input
                value={formValues.password}
                onChange={onInputChange}
                name="password"
                type="password"
              />
            </Label>
          </DivLabel>
          <DivButton>
            <Button disabled={disabled} >
              Submit
            </Button>
          </DivButton>
        </DivFormGroup>
      </form>
    </div>
  );
}
