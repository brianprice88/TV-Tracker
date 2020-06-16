import React, { useState } from 'react';
import './TopBar.css'

export default function TopBar({ axiosHandler, user }) {

    const [formType, showForm] = useState(null);

    return (
        <>
        <div className="jumbotron text-center header userWelcome">
            <h1>Welcome {user.email_address}!</h1>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className='nav-link navBarButton' onClick={() => axiosHandler('signOut', user.email_address, user.session)}>
                            <span>Sign Out</span>
                            </div>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle navBarButton" role="button" data-toggle="dropdown">
                            <span>Options</span>
                        </div>
                        <div className="dropdown-menu dropdownOptions">

                            <div className='nav-link navBarButton' onClick={() => showForm('UpdateEmail')}>
                                <span>Update Email</span>
                                </div>

                            <div className="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('UpdatePassword')}>
                                <span>Update Password</span>
                                </div>

                            <div className="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('SendFeedback')}>
                                <span>Send Feedback</span>
                                </div>

                            <div className="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('DeleteAccount')}>
                                <span>Delete Account</span>
                                </div>

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
        axiosHandler('updateInfo', user.email_address, user.session, 'email', newEmail);
        showForm(null)
    }
    return (
        <form onSubmit={changeEmail}>
            <div className="form-row align-items-center">
            <div className="col-auto">
                <input id='updatedEmail' type="email" className="form-control mb-2" placeholder="New Email" name="email_address" required />
            </div>
            <div className='col-auto'>
            <button type="submit" className="btn btn-primary mb-2">Update Email</button>
            </div>
            <div className='col-auto'>
            <button onClick={() => showForm(null)} type="button" className="btn btn-danger mb-2" data-dismiss="modal">Back</button>
            </div>
            </div>
        </form>
    )
};

function UpdatePassword({ user, axiosHandler, showForm }) {
    function changePassword(e) {
        e.preventDefault();
        let newPassword = document.getElementById('updatedPassword').value;
        document.getElementById('updatedPassword').value = '';
        axiosHandler('updateInfo', user.email_address, user.session, 'password', newPassword);
        showForm(null)
    }
    return (
            <form onSubmit={changePassword}>
             <div className="form-row align-items-center">
            <div className="col-auto">
                <input id='updatedPassword' type="password" className="form-control mb-2"
                    placeholder="New Password"
                    name="password" required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and 8-20 characters" />
                </div>
                <div className='col-auto'>
                <button type="submit" className="btn btn-primary mb-2">Update Password</button>
                </div>
                <div className='col-auto'>
                <button onClick={() => showForm(null)} type="button" className="btn btn-danger mb-2" data-dismiss="modal">Back</button>
            </div>
            </div>
            </form>
    )
};

function SendFeedback({ user, axiosHandler, showForm }) {
    function sendUserFeedback(e) {
        e.preventDefault();
        let feedback = document.getElementById('userMessage').value;
        let message = feedback.replace(/[^a-z0-9]/gi, '');
        document.getElementById('userMessage').value = '';
        axiosHandler('sendFeedback', user.email_address, user.session, message);
        showForm(null)
    }
    return (
            <form onSubmit={sendUserFeedback}>
                <div className="form-row align-items-center">
                <div className='col-auto'>
                    <textarea placeholder='Enter your questions or comments here' className="form-control mb-2" id="userMessage" rows="3"></textarea>
                    </div>
                <div className='col-auto'>
                    <button type="submit" className="btn btn-primary mb-2">Send message</button>
                    </div>
                <div className='col-auto'>
                    <button onClick={() => showForm(null)} type="button" className="btn btn-danger mb-2" data-dismiss="modal">Back</button>
                    </div>
           </div>
           </form>
    )
};


function DeleteAccount({ user, axiosHandler, showForm }) {
    return (
        <div className="form-row align-items-center">
            <div className='col-auto'>
            <strong>Warning!  This will erase all your progress</strong>
            </div>
            <div className='col-auto'>
            <button onClick={() => axiosHandler('deleteAccount', user.email_address, user.session)} type="button" className="btn btn-primary mb-2" data-dismiss="modal">Confirm</button>
            </div>
            <div className='col-auto'>
            <button onClick={() => showForm(null)} type="button" className="btn btn-danger mb-2" data-dismiss="modal">Back</button>
            </div>
        </div>
    )
}