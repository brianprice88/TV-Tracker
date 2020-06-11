import React from 'react';
import './Login.css'

export default function Login() {

  return (
         <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <form>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" placeholder="Email@email.dom" id="email" />
                                </div>
                                <div class="form-group">
                                    <label for="parola">Password</label>
                                    <input type="password" class="form-control" placeholder="********" id="parola" />
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-default" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
  )
}