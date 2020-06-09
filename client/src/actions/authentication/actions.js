import Axios from 'axios';
import authentication from '../../utils/baseURLs';
import authenticationConstants from './constants';
import { getUserInfo } from '../../utils/getUserInfo';
import alertActions from '../alerts/actions';

export const authenticationActions = {
  signUp,
  signIn,
  forgotPassword,
  checkSecurityQuestion,
  signOut
}

function signUp(email_address, password, security_question, security_answer) {
  return dispatch => {
    dispatch(request());

    return Axios.post(`${authentication}/signUp`, { email_address, password, security_question, security_answer })

      .then(function (response) {
        dispatch(alertActions.success(response.data.message))
        dispatch(success())
      }

        .catch(function (error) {
          dispatch(alertActions.failure('Sorry, there was an error.  Please try again.'))
          dispatch(failure())
        }))
  }

  function request() {
    return { type: authenticationConstants.SIGNUP_REQUEST }
  }

  function success() {
    return { type: authenticationConstants.SIGNUP_SUCCESS }
  }

  function failure() {
    return { type: authenticationConstants.SIGNUP_FAILURE }
  }

}

function signIn(email_address, password) {
  return dispatch => {
    dispatch(request());

    return Axios.post(`${authentication}/signIn`, { email_address, password })

      .then(function (response) {
        dispatch(alertActions.success(response.data.message))
        dispatch(success(response.data))
      }

        .catch(function (error) {
          dispatch(alertActions.failure(error.data.message))
          dispatch(failure())
        }))

    function request() {
      return { type: authenticationConstants.SIGNIN_REQUEST }
    }

    function success(user) {
      return { type: authenticationConstants.SIGNIN_SUCCESS, payload: user }
    }

    function failure() {
      return { type: authenticationConstants.SIGNIN_FAILURE }
    }

  }

  function forgotPassword(email_address) {

  }

  function checkSecurityQuestion(email_address, security_answer) {

  }

  function signOut() {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
  }

//   FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
//   FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
//   FORGOT_PASSWORD_FAILURE: "FORGOT_PASSWORD_FAILURE",

//   CHECK_SECURITY_ANSWER_REQUEST: "CHECK_SECURITY_ANSWER_REQUEST",
//   CHECK_SECURITY_ANSWER_SUCCESS: "CHECK_SECURITY_ANSWER_SUCCESS",
//   CHECK_SECURITY_ANSWER_FAILURE: "CHECK_SECURITY_ANSWER_FAILURE",

//   SIGNOUT_REQUEST: "SIGNOUT_REQUEST",
//   SIGNOUT_SUCCESS: "SIGNOUT_SUCCESS",
//   SIGNOUT_FAILURE: "SIGNOUT_FAILURE"