import React from 'react';

export default function SecurityQuestion({ showSecurityQuestion, axiosHandler, prompt }) {

    function getSecurityQuestion() {
        let email_address = document.getElementById('secQuestionEmail').value;
        axiosHandler('getSecurityQuestion', email_address)
    }

    function checkSecurityAnswer() {
        let email_address = document.getElementById('secQuestionEmail').value;
        let security_answer = document.getElementById('secQuestionAnswer').value;
        axiosHandler('checkSecurityAnswer', email_address, security_answer)
    }

    function updatePassword() {
        let email_address = document.getElementById('secQuestionEmail').value;
        let password = document.getElementById('resetPassword').value;
        axiosHandler('resetPassword', email_address, password);
        showSecurityQuestion(false);
    }

    return (
        <form id='forgotPasswordForm'>
            <button onClick={() => { showSecurityQuestion(false) }} type="button" className="close" >Go Back</button>
            <h1>Security Verification</h1>

            <div className="input-group mb-3">
                <input id='secQuestionEmail' type="email" className="form-control" placeholder="Your Email Address" autoComplete="on" required />
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button" onClick={getSecurityQuestion}>Get Security Question</button>
                </div>
            </div>
            {prompt ?
                <div className="input-group mb-3 input-lg">
                    <input id='secQuestionAnswer' type="password" className="form-control" placeholder={prompt} autoComplete="on" required />
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={checkSecurityAnswer}>Submit</button>
                    </div>
                </div>
                :
                null
            }
            {
                prompt === 'Please update your password.' ?
                    <div className="input-group mb-3 input-lg">
                        <input id='resetPassword' type="password" className="form-control" placeholder={prompt} autoComplete="on" required
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and 8-20 characters" />
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" onClick={updatePassword}>Update password</button>
                        </div>
                    </div>
                    :
                    null
            }
        </form>
    )

}