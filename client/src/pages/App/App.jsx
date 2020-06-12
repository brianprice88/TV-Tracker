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
    alert: null
  };

  clearAlert() {
    this.setState({
      alert: null
    })
  }

  async axiosHandler(func) {
    let args = [...arguments].slice(1);

    switch (func) {
      case 'signUp':
        try {
          let signUpReq = await signUp(args);
          this.setState({ alert: signUpReq.message })
        } catch (err) {
          this.setState({ alert: 'An account with this email address already exists.' })
        }

      case 'signIn':
        let signInReq = await signIn(args);
        try {

        } catch (err) {

        }

      case 'getSecurityQuestion':

      case 'checkSecurityAnswer':

      case 'signOut':

      case 'searchForShow':

      case 'addShowToList':

      case 'getEpisodeInfo':

      case 'updateEpisodeList':

      case 'removeShow':

      case 'toggleNotification':

      case 'updateInfo':

      case 'sendFeedback':

      case 'deleteAccount':


      default:
        return;
    }
  }

  render() {

    return (
      <>
        {/* {this.state.error ?
          <div className="alert alert-warning fade show" role="alert">
            <strong>Error!</strong> {this.state.error}
            <button onClick={this.clearError.bind(this)} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          : null} */}

        {!this.state.user 
        ? <HomePage 
        axiosHandler = {this.axiosHandler.bind(this)}
        alert = {this.state.alert}
        /> : 
        <UserPage 
        axiosHandler = {this.axiosHandler.bind(this)}
        user={this.state.user} 
        shows = {this.state.shows}
        />}

      </>
    );
  }
}

export default App;
