import React from 'react';
import HomePage from '../HomePage/HomePage';
import UserPage from '../UserPage/UserPage';
import Alert from './components/Alert.jsx'
import {
  signUp,
  signIn,
  getShows,
  signOut,
  addShowToList,
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
  };

  async componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let shows = await getShows([user.email_address, user.session]);
      this.setState({
        user: user,
        shows: shows.shows
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
          let persistUser = args[2]
          args = args.slice(0, 2)
          let signInReq = await signIn(args);
          signInReq.message
            ? this.setState({ alert: signInReq.message })
            : this.setState({ user: signInReq.user, shows: signInReq.shows },
              function () {
                if (persistUser) {
                  let user = JSON.stringify(this.state.user);
                  localStorage.setItem('user', user);
                }
              }
            )
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
          this.setState(currentState)
          break;

        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'updateEpisodeList':
        try {
          let updateEpisode = await updateEpisodeList(args);
          let updatedShow = updateEpisode.showName;
          let updatedEpisode = updateEpisode.episode;
          let currentState = JSON.parse(JSON.stringify(this.state));
          currentState.shows[updatedShow][updatedEpisode] = !currentState.shows[updatedShow][updatedEpisode];
          this.setState(currentState);
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'removeShow':
        try {
          let removeShowReq = await removeShow(args);
          let removedShow = removeShowReq.showName;
          let currentState = JSON.parse(JSON.stringify(this.state));
          delete currentState.shows[removedShow];
          this.setState(currentState);
          break;
        } catch (err) {
          this.setState({ alert: 'There was an error with your request.  Please try again.' });
          break;
        }

      case 'toggleNotification':
        try {
          let toggleNotificationReq = await toggleNotification(args);
          let toggledShow = toggleNotificationReq.showName;
          let currentState = JSON.parse(JSON.stringify(this.state));
          currentState.shows[toggledShow].notification = !currentState.shows[toggledShow].notification;
          this.setState(currentState)
          break;
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
            this.setState({ alert: 'Password successfully changed.' })
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
          <Alert
            clearAlert={() => this.setState({ alert: null })}
            alert={this.state.alert}
          />
          : null}

        {!this.state.user
          ? <HomePage
            axiosHandler={this.axiosHandler.bind(this)}
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
