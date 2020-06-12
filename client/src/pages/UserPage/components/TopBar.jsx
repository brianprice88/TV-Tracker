import React, { useState } from 'react';
import './TopBar.css'

export default function TopBar({ axiosHandler, user }) {

    const [formType, showForm] = useState(null);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">

            <h2>Welcome <strong>{user.email_address}</strong>
            </h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div className='nav-link navBarButton' onClick={() => axiosHandler('signOut', user.email_address, user.session)}>Sign Out</div>
                    </li>
                    <li class="nav-item dropdown">
                        <div class="nav-link dropdown-toggle navBarButton" role="button" data-toggle="dropdown">
                            Options
                        </div>
                        <div class="dropdown-menu">

                            <div className='nav-link navBarButton' onClick={() => showForm('UpdateEmail')}>Update Email</div>

                            <div class="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('UpdatePassword')}>Update Password</div>

                            <div class="dropdown-divider"></div>

                            <div className='nav-link navBarButton' onClick={() => showForm('SendFeedback')}>Send Feedback</div>

                            <div class="dropdown-divider"></div>

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
    )
}



function UpdateEmail({ user, axiosHandler, showForm }) {
    return (
        <form>
            <h2>Update your email</h2>
            <button onClick={() => axiosHandler('deleteAccount', user.email_address, user.session)} type="button" class="btn btn-danger" data-dismiss="modal">Confirm</button>
            <button onClick={() => showForm(null)} type="button" class="btn btn-danger" data-dismiss="modal">Back</button>
        </form>
    )
};

function UpdatePassword({ user, axiosHandler, showForm }) {
    return (
        <form>
            <h2>Update your password</h2>
            <button onClick={() => axiosHandler('deleteAccount', user.email_address, user.session)} type="button" class="btn btn-danger" data-dismiss="modal">Confirm</button>
            <button onClick={() => showForm(null)} type="button" class="btn btn-danger" data-dismiss="modal">Back</button>
        </form>
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
            <button type="submit" class="btn btn-primary mb-2">Send message</button>
            <button onClick={() => showForm(null)} type="button" class="btn btn-danger" data-dismiss="modal">Back</button>
            </form>
        </div>
    )
};


function DeleteAccount({ user, axiosHandler, showForm }) {
    return (
        <div className='form-group'>
            <h2>Warning!  This will erase all your progress</h2>
            <button onClick={() => axiosHandler('deleteAccount', user.email_address, user.session)} type="button" class="btn btn-danger" data-dismiss="modal">Confirm</button>
            <button onClick={() => showForm(null)} type="button" class="btn btn-danger" data-dismiss="modal">Exit</button>
        </div>
    )
}