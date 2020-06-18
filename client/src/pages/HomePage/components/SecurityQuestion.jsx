import React, { useState } from 'react';
import Alert from '../../App/components/Alert';
import './SecurityQuestion.css'
import { getSecurityQuestion, checkSecurityAnswer, resetPassword } from '../../../utils/axiosFunctions'


export default function SecurityQuestion({ showSecurityQuestion }) {

    const [prompt, updatePrompt] = useState(null);
    const [alert, updateAlert] = useState(null)

    async function queryForSecurityQuestion() {
        let email_address = document.getElementById('secQuestionEmail').value;
        let securityQuestionResult = await getSecurityQuestion([email_address]);
        if (securityQuestionResult.question) {
            updatePrompt(securityQuestionResult.question)
        } else if (securityQuestionResult.message) {
            updateAlert(securityQuestionResult.message)
        }
    }

    async function verifySecurityAnswer() {
        let email_address = document.getElementById('secQuestionEmail').value;
        let security_answer = document.getElementById('secQuestionAnswer').value;
        let securityAnswerResult = await checkSecurityAnswer([email_address, security_answer]);
        if (securityAnswerResult.prompt) {
            updatePrompt(securityAnswerResult.prompt)
        } else if (securityAnswerResult.message) {
            updateAlert(securityAnswerResult.message)
        }
    }

    async function updatePassword(e) {
        e.preventDefault();
        document.getElementById('forgotPasswordForm').reset();
        let email_address = document.getElementById('secQuestionEmail').value;
        let password = document.getElementById('resetPassword').value;
        let updatePasswordRequest = await resetPassword([email_address, password]);
        updateAlert(updatePasswordRequest.message);
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <form onSubmit={(e) => updatePassword(e)} id='forgotPasswordForm'>

                    {alert ?
                        <Alert
                            clearAlert={() => updateAlert(null)}
                            alert={alert}
                        />
                        : null
                    }

                    <button onClick={() => { showSecurityQuestion(false) }} type="button" className="close" >Go Back</button>
                    <h1>Verification</h1>

                    <div className="input-group mb-3">
                        <input id='secQuestionEmail' type="email" className="form-control" placeholder="Enter Email Address" autoComplete="on" required />
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" onClick={queryForSecurityQuestion}>Get Security Question</button>
                        </div>
                    </div>

                    {prompt ?
                        <div className="input-group mb-3 input-lg">
                            <input id='secQuestionAnswer' type="password" className="form-control" placeholder={prompt} autoComplete="on" required />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button" onClick={verifySecurityAnswer}>Check Answer</button>
                            </div>
                        </div>
                        :
                        null
                    }

                    {prompt === 'Please update your password.' ?
                        <div className="input-group mb-3 input-lg">
                            <input id='resetPassword' type="password" className="form-control" placeholder={prompt} autoComplete="on" required
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and 8-20 characters" />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="submit">Update password</button>
                            </div>
                        </div>
                        :
                        null
                    }
                </form>
            </div>
        </div>
    )

}