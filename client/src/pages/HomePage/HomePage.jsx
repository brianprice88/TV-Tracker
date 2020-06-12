import React, { useState } from 'react';
import './HomePage.css';
import Register from './components/Register';
import Login from './components/Login'

export default function HomePage({ axiosHandler, alert }) { // need to destructure props here - probably just authentication functions besides signout

    const [formDisplay, changeFormDisplay] = useState('Home')
    //pass down changeFormDisplay as a prop, and it can reset this back to 'home' for closing out of that form
    // similarly for Login add a separate useState hook to display for if user clicks on forgot password

    return (

        <div id="homePageCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                    <img src="assets/Better Call Saul.jpg" alt="Better Call Saul" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/Brooklyn Nine Nine.jpg" alt="Brooklyn Nine Nine" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/Good Girls.jpg" alt="Good Girls" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/Grey's Anatomy.jpg" alt="Grey's Anatomy" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/Killing Eve.jpg" alt="Killing Eve" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/Rick and Morty.png" alt="Rick and Morty" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/Succession.jpg" alt="Succession" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/The Blacklist.jpg" alt="The Blacklist" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/The Mandalorian.jpg" alt="The Mandalorian" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel-item">
                    <img src="assets/This Is Us.jpg" alt="This Is Us" className="img-responsive" id="carousel-img" />
                </div>
            </div>

            <div className="home-form">
                {formDisplay === 'Home'
                    ?
                    <div className='home-buttons'>
                        <h1>TV Tracker</h1>
                        <button type='button' className="btn btn-primary btn-lg" onClick={() => changeFormDisplay('Register')}>Register</button>
                        <button type='button' className="btn btn-primary btn-lg" onClick={() => changeFormDisplay('Login')}>Sign In</button>
                    </div>
                    : null}

                {formDisplay === 'Register'
                    ? <Register
                        changeFormDisplay={changeFormDisplay}
                        axiosHandler={axiosHandler}
                        alert={alert}
                    />
                    : null}

                {formDisplay === 'Login'
                    ? <Login
                        changeFormDisplay={changeFormDisplay}
                        axiosHandler={axiosHandler}
                        alert={alert}
                    />
                    : null}

            </div>


        </div>
    )

}