import React from 'react';
import './App.css';
import HomePage from '../HomePage/HomePage';
import UserPage from '../UserPage/UserPage';
import {
  signUp,
  signIn,
  getSecurityQuestion,
  checkSecurityAnswer,
  resetPassword,
  signOut,
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
    alert: null,
    prompt: null
  };

  clearAlert() {
    this.setState({
      alert: null
    })
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    let shows = JSON.parse(localStorage.getItem('shows'));
    if (user) {
      this.setState({
        user: user,
        shows: shows
      })
    }
  }

  async axiosHandler(func) {
    let args = [...arguments].slice(1);
    switch (func) {
      case 'signUp':
        try {
          let signUpReq = await signUp(args);
          this.setState({ alert: signUpReq.message });
          break;
        } catch (err) {
          this.setState({ alert: 'An account with this email address already exists.' })
          break;
        }

      case 'signIn':
        try {
          let persistUser = args[2] // whether user checked 'rememberMe'
          args = args.slice(0, 2)
          let signInReq = await signIn(args);
          signInReq.message
            ? this.setState({ alert: signInReq.message })
            : this.setState({ user: signInReq.user, shows: signInReq.shows },
              function () {
                if (persistUser) {
                  let user = JSON.stringify(this.state.user);
                  let shows = JSON.stringify(this.state.shows);
                  localStorage.setItem('user', user);
                  localStorage.setItem('shows', shows);
                }
              }
            )
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'getSecurityQuestion':
        try {
          let securityQuestionReq = await getSecurityQuestion(args);
          securityQuestionReq.message
            ? this.setState({ alert: securityQuestionReq.message })
            : this.setState({ prompt: securityQuestionReq.question })
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'checkSecurityAnswer':
        try {
          let securityAnswerReq = await checkSecurityAnswer(args);
          securityAnswerReq.prompt
            ? this.setState({ prompt: securityAnswerReq.prompt })
            : this.setState({ alert: securityAnswerReq.message })
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'resetPassword':
        try {
          let resetPasswordReq = await resetPassword(args);
          this.setState({ alert: resetPasswordReq.message, prompt: null });
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'signOut':
        try {
          let signOutReq = await signOut(args);
          this.setState({ alert: signOutReq.message, user: null, shows: null },
            function () { localStorage.clear() }
          );
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'addShowToList':
        try {
          let addShowReq = await addShowToList(args);
          let { name, tvmaze_id, episodes } = addShowReq;
          let eps = {};
          episodes.forEach(
            function (episode) { eps[episode] = false }
          )
          let currentState = JSON.parse(JSON.stringify(this.state));
          currentState.shows[name] = {
            tvmaze_id: tvmaze_id,
            notification: false,
            episodes: eps
          };
          this.setState(currentState, () => console.log(this.state))
          break;

        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'getEpisodeInfo':
        try {

        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'updateEpisodeList':
        try {

        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'removeShow':
        try {

        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'toggleNotification':
        try {

        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'updateInfo':
        try {
          let updateInfoReq = await updateInfo(args);
          if (updateInfoReq.field === 'email') {
            let newUser = { ...this.state.user, email_address: updateInfoReq.update }
            this.setState({ alert: 'Email address successfully changed.', user: newUser })
          } else if (updateInfoReq.field === 'password') {
            this.setState({ alert: 'Email address successfully changed.' })
          }
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'sendFeedback':
        try {
          let sendFeedbackReq = await sendFeedback(args);
          this.setState({ alert: sendFeedbackReq.message });
          break;

        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'deleteAccount':
        try {
          let deleteAccountReq = await deleteAccount(args);
          this.setState({ alert: deleteAccountReq.message, user: null, shows: null },
            function () { localStorage.clear() }
          );
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' },
          );
          break;
        }

      default:
        return;
    }
  }

  render() {
    return (
      <>
        {this.state.alert ?
          <div className="alert alert-warning fade show" role="alert">
            <strong>{this.state.alert}</strong>
            <button onClick={this.clearAlert.bind(this)} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          : null}

        {!this.state.user
          ? <HomePage
            axiosHandler={this.axiosHandler.bind(this)}
            alert={this.state.alert}
            prompt={this.state.prompt}
          /> :
          <UserPage
            axiosHandler={this.axiosHandler.bind(this)}
            user={this.state.user}
            shows={this.state.shows}
          />}

      </>
    );
  }
}

export default App;
