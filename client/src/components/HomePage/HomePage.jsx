import React from 'react';
import './HomePage.css'

export default function HomePage() {

    return (

        <div id="homePageCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
                <div className="carousel item active">
                    <img src="assets/Better Call Saul.jpg" alt="Better Call Saul" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/Brooklyn Nine Nine.jpg" alt="Brooklyn Nine Nine" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/Good Girls.jpg" alt="Good Girls" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/Grey's Anatomy.jpg" alt="Grey's Anatomy" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/Killing Eve.jpg" alt="Killing Eve" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/Rick and Morty.png" alt="Rick and Morty" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/Succession.jpg" alt="Succession" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/The Blacklist.jpg" alt="The Blacklist" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/The Mandalorian.jpg" alt="The Mandalorian" className="img-responsive" id="carousel-img" />
                </div>
                <div className="carousel item">
                    <img src="assets/This Is Us.jpg" alt="This Is Us" className="img-responsive" id="carousel-img" />
                </div>
            </div>

            <div class="vertical-center">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <form>
                                <div class="form-group">
                                    <label for="numeutilizator">Name</label>
                                    <input type="text" name="unr" class="form-control" id="numeutilizator" placeholder="Nume de utilizator" />

                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" name="emr" class="form-control" placeholder="Email@email.dom" id="email" />
                                </div>
                                <div class="form-group">
                                    <label for="parola">Password</label>
                                    <input type="password" class="form-control" name="pwr" placeholder="********" id="parola" />
                                </div>
                                <div class="form-group">
                                    <input type="submit" name="r" class="btn btn-default" value="Inregistreaza-te" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}