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
  };
  async componentDidMount() {
    let test = await signUp("brianprice@gmail.com", "password");
   
  };

  render() {

    return (
      <div>
        {!this.state.user ? <HomePage /> : <UserPage user={this.state.user} shows={this.state.shows} />}
      </div>
    );
  }
}

export default App;
