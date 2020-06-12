import React from 'react';
import './TopBar.css'

export default function TopBar({ axiosHandler, user }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">

            <h2>Welcome <strong>{user.email_address}</strong>
            </h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <div className='nav-link navBarButton' onClick={() => axiosHandler('signOut', user.email_address, user.session)}>Sign Out</div>
                    </li>
                    <li class="nav-item dropdown">
                        <div class="nav-link dropdown-toggle navBarButton" id="optionsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Options
                        </div>
                        <div class="dropdown-menu" aria-labelledby="optionsDropdown">

                            <div class="nav-link dropdown-toggle navBarButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Update Email</div>

                            <div class="dropdown-divider"></div>

                            <div class="nav-link dropdown-toggle navBarButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Update Password</div>

                            <div class="dropdown-divider"></div>

                            <div class="nav-link dropdown-toggle navBarButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Send Feedback</div>

                            <div class="dropdown-divider"></div>

                            <div className="nav-link dropdown-toggle navBarButton" id='deleteAccount' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Delete Account</div>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="deleteAccount">
                                <div className="dropdown-item modal-header">
                                    <h4 className="modal-title">Warning!</h4>
                                </div>
                                <div className="modal-body">
                                    This will delete all your progress.
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => axiosHandler('deleteAccount', user.email_address, user.session)} type="button" class="btn btn-danger" data-dismiss="modal">Confirm</button>
                                </div>

                            </div>


                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}