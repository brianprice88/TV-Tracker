import React, { useState, useReducer, useEffect } from 'react';
import './Register.css';
import Alert from '../../App/components/Alert';

export default function Register({ changeFormDisplay, axiosHandler }) {

    const [alert, updateAlert] = useState(null);
    var code;

    function createCaptcha() {
        document.getElementById('captcha').innerHTML = "";
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%&";
        var captcha = [];
        while (captcha.length < 6) {
            var index = Math.floor(Math.random() * chars.length + 1);
            if (captcha.indexOf(chars[index]) === -1) {
                captcha.push(chars[index]);
            }
        }
        var canv = document.createElement("canvas");
        canv.id = "captcha";
        canv.width = 150;
        canv.height = 50;
        var ctx = canv.getContext("2d");
        ctx.font = "bold 32px Georgia";
        ctx.strokeText(captcha.join(""), 0, 30);
        code = captcha.join("");
        document.getElementById("captcha").appendChild(canv);
    }

    useEffect(() => createCaptcha())

    const initialFormInfo = { email_address: '', password: '', security_question: 'What was the name of your first pet?', security_answer: '', captcha: '' }

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
        if (!formInfo.security_answer.match(/^[a-zA-Z]+$/)) { updateAlert('Your security answer must only contain letters'); return; };
        let captchaText = formInfo.captcha;
        if (captchaText !== code) {
            updateAlert('Incorrect captcha.  Please try again.');
            return;
        };
        document.getElementById('registerForm').reset()
        axiosHandler('signUp', formInfo.email_address, formInfo.password, formInfo.security_question, formInfo.security_answer)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <form id='registerForm' onSubmit={handleSubmit}>

                    {alert ?
                        <Alert
                            clearAlert={() => updateAlert(null)}
                            alert={alert}
                        />
                        : null
                    }

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
                    <div className="form-group">
                        <label>Prove you're not a robot:</label>
                        <div id='captcha'></div>
                        <input type="text" className="form-control" placeholder="Enter the above captcha (case sensitive)" name="captcha" required onChange={addNewInfo} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register!</button>
                </form>
            </div>
        </div>
    )
}