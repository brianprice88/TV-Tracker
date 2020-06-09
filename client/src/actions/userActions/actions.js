import Axios from 'axios';
import userAction from '../../utils/baseURLs';
import { userActionsConstants } from './constants';
import { getUserInfo } from '../../utils/getUserInfo';

export const userActions = {
    searchForShow,
    addShowToList,
    getEpisodeInfo,
    updateEpisodeWatchlist,
    removeShowFromList,
    toggleNewEpisodeNotification,
    updateInfo,
    sendFeedback,
    deleteAccount
}

function searchForShow(search) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
};

function addShowToList(tvmaze_id, name) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
};

function getEpisodeInfo(tvmaze_id, season, number) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
};

function updateEpisodeWatchlist(tvmaze_id, episode, addEpisode) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
};

function removeShowFromList(tvmaze_id) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
};

function toggleNewEpisodeNotification(tvmaze_id) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
};

function updateInfo(field, update) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];
};

function sendFeedback(message) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/sendUserFeedback`, { email_address, session, message })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.SEND_FEEDBACK_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.SEND_FEEDBACK_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.SEND_FEEDBACK_FAILURE, payload: message }
    }

};

function deleteAccount() {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/deleteAccount`, { email_address, session })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: authenticationConstants.DELETE_ACCOUNT_REQUEST }
    }

    function success(message) {
        return { type: authenticationConstants.DELETE_ACCOUNT_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: authenticationConstants.DELETE_ACCOUNT_FAILURE, payload: message }
    }

}

// SEARCH_FOR_SHOW_REQUEST: "SEARCH_FOR_SHOW_REQUEST",
//     SEARCH_FOR_SHOW_SUCCESS: "SEARCH_FOR_SHOW_SUCCESS",
//     SEARCH_FOR_SHOW_FAILURE: "SEARCH_FOR_SHOW_FAILURE",

//     ADD_SHOW_TO_LIST_REQUEST: "ADD_SHOW_TO_LIST_REQUEST",
//     ADD_SHOW_TO_LIST_SUCCESS: "ADD_SHOW_TO_LIST_SUCCESS",
//     ADD_SHOW_TO_LIST_FAILURE: "ADD_SHOW_TO_LIST_FAILURE",

//     GET_EPISODE_INFO_REQUEST: "GET_EPISODE_INFO_REQUEST",
//     GET_EPISODE_INFO_SUCCESS: "GET_EPISODE_INFO_SUCCESS",
//     GET_EPISODE_INFO_FAILURE: "GET_EPISODE_INFO_FAILURE",

//     UPDATE_EPISODE_LIST_REQUEST: "ADD_EPISODE_TO_WATCHLIST_REQUEST",
//     UPDATE_EPISODE_LIST_SUCCESS: "ADD_EPISODE_TO_WATCHLIST_SUCCESSS",
//     UPDATE_EPISODE_LIST_FAILURE: "ADD_EPISODE_TO_WATCHLIST_FAILURE",

//     REMOVE_SHOW_FROM_LIST_REQUEST: "REMOVE_SHOW_FROM_LIST_REQUEST",
//     REMOVE_SHOW_FROM_LIST_SUCCESS: "REMOVE_SHOW_FROM_LIST_SUCCESS",
//     REMOVE_SHOW_FROM_LIST_FAILURE: "REMOVE_SHOW_FROM_LIST_FAILURE",

//     TOGGLE_NEW_EPISODE_NOTIFICATION_REQUEST: "TOGGLE_NEW_EPISODE_NOTIFICATION_REQUEST",
//     TOGGLE_NEW_EPISODE_NOTIFICATION_SUCCESS: "TOGGLE_NEW_EPISODE_NOTIFICATION_SUCCESS",
//     TOGGLE_NEW_EPISODE_NOTIFICATION_FAILURE: "TOGGLE_NEW_EPISODE_NOTIFICATION_FAILURE",

//     UPDATE_INFO_REQUEST: "UPDATE_EMAIL_ADDRESS_REQUEST",
//     UPDATE_INFO_SUCCESS: "UPDATE_EMAIL_ADDRESS_SUCESS",
//     UPDATE_INFO_FAILURE: "UPDATE_EMAIL_ADDRESS_FAILURE",

      //     DELETE_ACCOUNT_REQUEST: "DELETE_ACCOUNT_REQUEST",
//     DELETE_ACCOUNT_SUCCESS: "DELETE_ACCOUNT_SUCCESS",
//     DELETE_ACCOUNT_FAILURE: "DELETE_ACCOUNT_FAILURE"