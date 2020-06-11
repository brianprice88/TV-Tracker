import React from 'react';
import './App.css';
import HomePage from '../HomePage/HomePage';
import UserPage from '../UserPage/UserPage';
import {
  signUp, 
  signIn, 
  getSecurityQuestion, 
  checkSecurityAnswer, 
  signOut, 
  searchForShow,
  addShowToList,
  getEpisodeInfo,
  updateEpisodeList,
  removeShow,
  toggleNotification,
  updateInfo,
  sendFeedback,
  deleteAccount
} from '../../utils/axiosFunctions';

class App extends React.Component {
  state = {
    user: null,
    shows: null,
    error: null
  };

async axiosHandler (func) {
  let args = [...arguments].slice(1);

  switch (func) {
    case signUp:
      try {
      let signUpReq = await signUp(args);
      console.log(signUpReq)
      } catch (err) {
        this.setState({error: 'An account with this email address already exists.'})
      }
      
    case signIn:
      let signInReq = await signIn(args);

    case getSecurityQuestion:

    case checkSecurityAnswer:

    case signOut:

    case searchForShow:

    case addShowToList:

    case getEpisodeInfo:

    case updateEpisodeList:

    case removeShow:

    case toggleNotification:

    case updateInfo:

    case sendFeedback:

    case deleteAccount:


    default:
      return;
  }
}

  async componentDidMount() {
    let test = this.axiosHandler(signUp, 'brianprice', 'password')
   
  };

  render() {

    return (
      <div>
        {!this.state.user ? <HomePage /> : <UserPage user={this.state.user} />}
      </div>
    );
  }
}

export default App;
