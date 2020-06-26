import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";
import { loginFormSchema } from "./formSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const I = styled.i`
  padding: 0px 5px;
`;
const DivFormGroup = styled.div`
  width: 30%;
  margin: 200px 35% 0;
  padding: 0 10px;
  border: 1px solid #173d53;
  background-color: #25b3a7;
  color: #173d53;
  border-radius: 5px;
`;

const DivLabel = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const DivButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  backgoundcolor: "green";
`;
const Button = styled.button`
  margin: 0px auto;
  font-size: 1.1rem;
  padding: 2px 10px;
`;

const H4 = styled.h4`
  margin: 5px auto;
  padding: 0;
`;

const Label = styled.label`
  font-size: 1.5rem;
  margin: 0px auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  width: 60%;
`;

const eye = <FontAwesomeIcon icon={faEye} />;

const initialFormValues = {
  name: "",
  password: "",
};

const initialFormErrors = {
  name: "",
  password: "",
};

export default function LoginForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const history = useHistory();

  const onSubmit = (evt) => {
    evt.preventDefault();
    const credentials = {
      username: formValues.name,
      password: formValues.password,
    };
    // postLogin(credentials);
    axiosWithAuth()
      .post("api/login", credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        history.push("/recommend");
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    Yup.reach(loginFormSchema, name)
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

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    loginFormSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
      //console.log('valid:' + valid);
    });
  }, [formValues]);

  return (
    <div>
      <form className="form container" onSubmit={onSubmit}>
        <div className="errors">
          <div>{formErrors.name}</div>
          <div>{formErrors.password}</div>
        </div>

        <DivFormGroup>
          <DivLabel>
            <Label>
              Name:&nbsp;
              <Input
                value={formValues.name}
                onChange={onInputChange}
                name="name"
                type="text"
              />
            </Label>
          </DivLabel>
          <DivLabel>
            <Label>
              Password:&nbsp;
              <Input
                value={formValues.password}
                onChange={onInputChange}
                name="password"
                type={passwordShown ? "text" : "password"}
              />
              <I onClick={togglePasswordVisiblity}>{eye}</I>
            </Label>
          </DivLabel>
          <DivButton>
            <Button disabled={disabled}>Submit</Button>
            <H4>
              Not a user?
              <Link className="links" to="/signup">
                Signup
              </Link>
            </H4>
          </DivButton>
        </DivFormGroup>
      </form>
    </div>
  );
}
