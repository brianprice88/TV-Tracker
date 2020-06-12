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

    return (
        <form id='forgotPasswordForm'>
            <button onClick={() => { showSecurityQuestion(false) }} type="button" className="close" aria-label="Close">Go Back</button>
            <h1>Security Verification</h1>

            <div className="input-group mb-3">
                <input id='secQuestionEmail' type="email" className="form-control" placeholder="Your Email Address" aria-label="Your Email Address" aria-describedby="basic-addon2" autoComplete="on" required />
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button" onClick={getSecurityQuestion}>Get Security Question</button>
                </div>
            </div>
            {prompt ?
                <div className="input-group mb-3 input-lg">
                    <input id='secQuestionAnswer' type="password" className="form-control" placeholder={prompt} aria-label={prompt} aria-describedby="basic-addon2" autoComplete="on" required />
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={checkSecurityAnswer}>Submit</button>
                    </div>
                </div>
                :
                null
            }
        </form>
    )

}