import React, { useReducer } from 'react';
import './Register.css'

export default function Register({ changeFormDisplay, axiosHandler, alert }) {



    const initialFormInfo = { email_address: '', password: '', security_question: 'What was the name of your first pet?', security_answer: ''}

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
        document.getElementById('registerForm').reset()
        axiosHandler('signUp', formInfo.email_address, formInfo.password, formInfo.security_question, formInfo.security_answer)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <form id= 'registerForm' onSubmit={handleSubmit}>
                <button onClick={() => {changeFormDisplay('Home')}} type="button" className="close" aria-label="Close">Go Back</button>
                    <h1>Sign up</h1>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="yourEmail@domain.com" name="email_address" required onChange={addNewInfo} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password" required onChange={addNewInfo} />
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
                        <input type="password" className="form-control" placeholder="Make sure you remember this!" name="security_answer" required onChange={addNewInfo} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register!</button>
                </form>
            </div>
        </div>
    )
}