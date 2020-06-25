import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { loginFormSchema } from "./formSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const DivFormGroup = styled.div`
    font-family: Georgia;
    color: #050709;
    padding: 0 10px;
`

const DivLabel = styled.div`
    margin: 20px 0;
`
const DivButton = styled.div`
    backgoundColor: "green",
    padding: "5px 10px",
    margin: "10px 50%"
`

const eye = <FontAwesomeIcon icon={faEye} />;

const initialFormValues = {
    email: "",
    password: "",
};

const initialFormErrors = {
    email: "",
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
      email: formValues.email,
      password: formValues.password,
    };
    // postLogin(credentials);
    axiosWithAuth()
      .post(
        "https://med-cabinet-build-week.herokuapp.com/api/auth/login",
        credentials
      )
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
                    <div>{formErrors.email}</div>
                    <div>{formErrors.password}</div>
                </div>

                <DivFormGroup>
                    <DivLabel>
                        <label>
                            Email:&nbsp;
                            <input
                                value={formValues.email}
                                onChange={onInputChange}
                                name="email"
                                type="text"
                            />
                        </label>
                    </DivLabel>
                    <DivLabel>
                        <label>
                            Password:&nbsp;
                            <input
                                value={formValues.password}
                                onChange={onInputChange}
                                name="password"
                                type={passwordShown ? "text" : "password"}
                            />
                            <i onClick={togglePasswordVisiblity}>{eye}</i>
                        </label>
                    </DivLabel>
                    <DivButton>
                        <button disabled={disabled} >
                            Submit
                        </button>
                    </DivButton>
                </DivFormGroup>
            </form>
        </div>
    );
}
