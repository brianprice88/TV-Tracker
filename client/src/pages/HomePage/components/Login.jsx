import React, { useReducer, useState } from 'react';
import './Login.css';
import SecurityQuestion from './SecurityQuestion.jsx'

export default function Login({ changeFormDisplay, axiosHandler, alert, prompt }) {

    const [displaySecurityQuestion, showSecurityQuestion] = useState(false);

    const initialFormInfo = { email_address: '', password: '' }

    const addNewInfo = function (e) {
        dispatch({ type: e.target.name, payload: e.target.value })
    };

    const updateFormInfoState = function (state, action) {
        let updatedState = Object.assign(state);
        updatedState[action.type] = action.payload;
        return updatedState
    }

    const [formInfo, dispatch] = useReducer(updateFormInfoState, initialFormInfo)

    function handleSubmit(e) {
        e.preventDefault();
        document.getElementById('loginForm').reset()
        axiosHandler('signIn', formInfo.email_address, formInfo.password)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                    {!displaySecurityQuestion ?
                    <form id='loginForm' onSubmit={handleSubmit}>
                    <button onClick={() => { changeFormDisplay('Home') }} type="button" className="close" aria-label="Close">Go Back</button>
                    <h1>Sign in</h1>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="yourEmail@domain.com" name="email_address" autoComplete="on" required onChange={addNewInfo} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password" autoComplete="on" required onChange={addNewInfo} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in!</button>
                    <button onClick={() => { showSecurityQuestion(true) }} type="button" className="close" aria-label="Close">Forgot password?</button>
                    </form>
                    : <SecurityQuestion 
                        changeFormDisplay = {changeFormDisplay}
                        prompt = {prompt}
                        axiosHandler = {axiosHandler}
                        showSecurityQuestion = {showSecurityQuestion}

                    />
                }

            </div>
        </div>
    )
}