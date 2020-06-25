import React, { useState } from "react";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Georgia;
    color: #050709;
    padding: 10px;
`

const DivButton = styled.div`
    display: flex;
    justify-content: space-around;
    width: 40%;
    margin: 10px 30%;
`


export default function LoginPage() {
    const [showLoginForm, setShowLoginForm] = useState(true);

   
    return (
    <Div>
        <h1>Med Cabinet</h1>
        <DivButton>
            <button onClick={ e => setShowLoginForm(true)}>LOGIN</button> 
            <button onClick={ e => setShowLoginForm(false)}>SIGNUP</button>
        </DivButton>
        {
            showLoginForm && <LoginForm />
        }
        {
            !showLoginForm && <SignupForm />
        }        
    </Div>  
    )
}