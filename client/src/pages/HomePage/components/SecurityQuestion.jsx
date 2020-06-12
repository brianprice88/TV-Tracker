import React from 'react';

export default function SecurityQuestion({ showSecurityQuestion, axiosHandler, prompt }) {

    function getSecurityQuestion () {
      let email_address = document.getElementById('secQuestionEmail').value;
      axiosHandler('getSecurityQuestion', email_address)
    }

    return (
        <form id='forgotPasswordForm'>
            <button onClick={() => { showSecurityQuestion(false) }} type="button" className="close" aria-label="Close">Go Back</button>
            <h1>Security Verification</h1>

            <div className="input-group mb-3">
                <input id='secQuestionEmail' type="email" className="form-control" placeholder="Your Email Address" aria-label="Your Email Address" aria-describedby="basic-addon2" autoComplete="on" required/>
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button" onClick = {getSecurityQuestion}>Get Security Question</button>
                </div>
            </div>
            {prompt ?
            <h1>{prompt}</h1>
                :
                null
            }

            {/* <div className="form-group">
                <label>Enter the email address associated with your account</label>
                <input type="email" className="form-control" placeholder="yourEmail@domain.com" name="email_address" autoComplete="on" required />
            </div> */}
            {/* <h1>Sign in</h1>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="yourEmail@domain.com" name="email_address" autoComplete="on" required onChange={addNewInfo} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password" autoComplete="on" required onChange={addNewInfo} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in!</button>
                    <button onClick={() => { changeFormDisplay('Home') }} type="button" className="close" aria-label="Close">Forgot password?</button> */}
        </form>
    )

}