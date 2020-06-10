import Axios from 'axios';
import { authentication } from '../../utils/baseURLs';
import { authenticationConstants } from './constants';
import { getUserInfo } from '../../utils/getUserInfo';

export const authenticationActions = {
  signUp,
  signIn,
  forgotPassword,
  checkSecurityAnswer,
  signOut
}

function signUp(email_address, password, security_question, security_answer) {
  return (dispatch) => {
    dispatch(request());

    return Axios.post(`${authentication}/signUp`, { email_address, password, security_question, security_answer })

      .then(function (response) {
        console.log(response)
        dispatch(result(response.data))
      })

      .catch(function (error) {
        dispatch(result(error.data))
      })
  }

  function request() {
    return { type: authenticationConstants.SIGNUP_REQUEST }
  }

  function result(message) {
    return { type: authenticationConstants.SIGNUP_RESULT, payload: message }
  }

}

function signIn(email_address, password) {
  return dispatch => {
    dispatch(request());

    return Axios.post(`${authentication}/signIn`, { email_address, password })

      .then(function (response) {
        dispatch(success(response.data))
      })

      .catch(function (error) {
        dispatch(failure(error.data))
      })

    function request() {
      return { type: authenticationConstants.SIGNIN_REQUEST }
    }

    function success(user) {
      return { type: authenticationConstants.SIGNIN_SUCCESS, payload: user }
    }

    function failure(message) {
      return { type: authenticationConstants.SIGNIN_FAILURE, payload: message }
    }

  }
}

  function forgotPassword(email_address) {
    return dispatch => {
      dispatch(request());

      return Axios.get(`${authentication}/${email_address}`)

        .then(function (response) {
          dispatch(success(response.data))
        })

        .catch(function (error) {
          dispatch(failure(error.data))
        })
    }

    function request() {
      return { type: authenticationConstants.FORGOT_PASSWORD_REQUEST }
    }

    function success(message) {
      return { type: authenticationConstants.FORGOT_PASSWORD_SUCCESS, payload: message }
    }

    function failure(message) {
      return { type: authenticationConstants.FORGOT_PASSWORD_FAILURE, payload: message }
    }
  }

  function checkSecurityAnswer(email_address, security_answer) {
    return dispatch => {
      dispatch(request());

      return Axios.post(`${authentication}/checkSecurityAnswer`, { email_address, security_answer })

        .then(function (response) {
          dispatch(success(response.data))
        })

        .catch(function (error) {
          dispatch(failure(error.data))
        })
    }

    function request() {
      return { type: authenticationConstants.CHECK_SECURITY_ANSWER_REQUEST }
    }

    function success(user) {
      return { type: authenticationConstants.CHECK_SECURITY_ANSWER_SUCCESS, payload: user }
    }

    function failure(message) {
      return { type: authenticationConstants.CHECK_SECURITY_ANSWER_FAILURE, payload: message }
    }

  }

  function signOut() {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
      dispatch(request());

      return Axios.post(`${authentication}/signOut`, { email_address, session })

        .then(function (response) {
          dispatch(success(response.data))
        })

        .catch(function (error) {
          dispatch(failure(error.data))
        })
    }

    function request() {
      return { type: authenticationConstants.SIGNOUT_REQUEST }
    }

    function success(message) {
      return { type: authenticationConstants.SIGNOUT_SUCCESS, payload: message }
    }

    function failure(message) {
      return { type: authenticationConstants.SIGNOUT_FAILURE, payload: message }
    }

  }
