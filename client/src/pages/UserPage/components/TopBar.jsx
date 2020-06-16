import React, { useState } from 'react';
import './TopBar.css'

export default function TopBar({ axiosHandler, user }) {

    const [formType, showForm] = useState(null);

    return (
        <>
        <div className="jumbotron text-center header userWelcome">
            <h1>Welcome {user.email_address}!</h1>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className='nav-link navBarButton' onClick={() => axiosHandler('signOut', user.email_address, user.session)}>Sign Out</div>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle navBarButton" role="button" data-toggle="dropdown">
                            Options
                        </div>
                        <div className="dropdown-menu">

                            <div className='nav-link navBarButton' onClick={() => showForm('UpdateEmail')}>Update Email</div>

                            <div className="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('UpdatePassword')}>Update Password</div>

                            <div className="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('SendFeedback')}>Send Feedback</div>

                            <div className="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('DeleteAccount')}>Delete Account</div>

                        </div>
                    </li>
                </ul>


                {formType === 'UpdateEmail'
                    ? <UpdateEmail user={user}
                        axiosHandler={axiosHandler}
                        showForm={showForm} />
                    : null}

                {formType === 'UpdatePassword'
                    ? <UpdatePassword user={user}
                        axiosHandler={axiosHandler}
                        showForm={showForm} />
                    : null}

                {formType === 'SendFeedback'
                    ? <SendFeedback user={user}
                        axiosHandler={axiosHandler}
                        showForm={showForm} />
                    : null}

                {formType === 'DeleteAccount'
                    ? <DeleteAccount user={user}
                        axiosHandler={axiosHandler}
                        showForm={showForm} />
                    : null}

            </div>
        </nav>
        </>
    )
}



function UpdateEmail({ user, axiosHandler, showForm }) {
    function changeEmail(e) {
        e.preventDefault();
        let newEmail = document.getElementById('updatedEmail').value
        document.getElementById('updatedEmail').value = '';
        axiosHandler('updateInfo', user.email_address, user.session, 'email', newEmail)
    }
    return (
        <form onSubmit={changeEmail}>
            <div className="form-group">
                <label>New Email:</label>
                <input id='updatedEmail' type="email" className="form-control" placeholder="YourEmail@domain.com" name="email_address" required />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Update Email</button>

            <button onClick={() => showForm(null)} type="button" className="btn btn-danger" data-dismiss="modal">Back</button>
        </form>
    )
};

function UpdatePassword({ user, axiosHandler, showForm }) {
    function changePassword(e) {
        e.preventDefault();
        let newPassword = document.getElementById('updatedPassword').value;
        document.getElementById('updatedPassword').value = '';
        axiosHandler('updateInfo', user.email_address, user.session, 'password', newPassword);
    }
    return (
        <div className='form-group'>
            <form onSubmit={changePassword}>
                <label>New Password:</label>
                <input id='updatedPassword' type="password" className="form-control"
                    placeholder="Must contain a number, uppercase and lowercase letter"
                    name="password" required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and 8-20 characters" />
                <button type="submit" className="btn btn-primary mb-2">Update Password</button>
                <button onClick={() => showForm(null)} type="button" className="btn btn-danger" data-dismiss="modal">Back</button>
            </form>
        </div>
    )
};

function SendFeedback({ user, axiosHandler, showForm }) {
    function sendUserFeedback(e) {
        e.preventDefault();
        let feedback = document.getElementById('userMessage').value;
        let message = feedback.replace(/[^a-z0-9]/gi, '');
        document.getElementById('userMessage').value = '';
        axiosHandler('sendFeedback', user.email_address, user.session, message)
    }

    return (
        <div className="form-group">
            <form onSubmit={sendUserFeedback}>
                <textarea placeholder='Enter your questions or comments here' className="form-control" id="userMessage" rows="3"></textarea>
                <button type="submit" className="btn btn-primary mb-2">Send message</button>
                <button onClick={() => showForm(null)} type="button" className="btn btn-danger" data-dismiss="modal">Back</button>
            </form>
        </div>
    )
};


function DeleteAccount({ user, axiosHandler, showForm }) {
    return (
        <div className='form-group'>
            <h2>Warning!  This will erase all your progress</h2>
            <button onClick={() => axiosHandler('deleteAccount', user.email_address, user.session)} type="button" className="btn btn-danger" data-dismiss="modal">Confirm</button>
            <button onClick={() => showForm(null)} type="button" className="btn btn-danger" data-dismiss="modal">Exit</button>
        </div>
    )
}