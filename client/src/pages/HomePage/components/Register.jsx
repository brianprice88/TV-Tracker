import React, { useReducer } from 'react';
import './Register.css'

export default function Register({ changeFormDisplay, axiosHandler }) {



    const initialFormInfo = { email_address: '', password: '', security_question: 'What was the name of your first pet?', security_answer: '' }

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
        if (!formInfo.security_answer.match(/^[a-zA-Z]+$/)) { return }
        e.preventDefault();
        document.getElementById('registerForm').reset()
        axiosHandler('signUp', formInfo.email_address, formInfo.password, formInfo.security_question, formInfo.security_answer)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <form id='registerForm' onSubmit={handleSubmit}>
                    <button onClick={() => { changeFormDisplay('Home') }} type="button" className="close">Go Back</button>
                    <h1>Sign up</h1>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="YourEmail@domain.com" name="email_address" required onChange={addNewInfo} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control"
                            placeholder="Must contain a number, uppercase and lowercase letter"
                            name="password" required onChange={addNewInfo}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and 8-20 characters" />
                    </div>
                    <div className="form-group">
                        <label>Select a security question:</label>
                        <select name='security_question' onChange={addNewInfo} className="form-control">
                            <option value='What was the name of your first pet?'>What was the name of your first pet?</option>
                            <option value='What was the make of your first car?'>What was the make of your first car?</option>
                            <option value='What is the maiden name of your mother?'>What is the maiden name of your mother?</option>
                            <option value='In what city was your father born?'>In what city was your father born?</option>
                            <option value='What was your high school mascot?'>What was your high school mascot?</option>
                            <option value='What is your favorite color?'>What is your favorite color?</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Answer for your security question:</label>
                        <input type="password" className="form-control" placeholder="Must only contain letters (not case sensitive)" name="security_answer" required onChange={addNewInfo} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register!</button>
                </form>
            </div>
        </div>
    )
}