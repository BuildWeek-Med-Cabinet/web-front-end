import React, { useState } from "react";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Div, DivButton } from './LoginForm.jsx';


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