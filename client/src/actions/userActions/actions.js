import Axios from 'axios';
import { userAction } from '../../utils/baseURLs';
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

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/showSearch`, { email_address, session, search })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.SEARCH_FOR_SHOW_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.SEARCH_FOR_SHOW_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.SEARCH_FOR_SHOW_FAILURE, payload: message }
    }
};

function addShowToList(tvmaze_id, name) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/addShowToList`, { email_address, session, tvmaze_id, name })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.ADD_SHOW_TO_LIST_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.ADD_SHOW_TO_LIST_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.ADD_SHOW_TO_LIST_FAILURE, payload: message }
    }
    
};

function getEpisodeInfo(tvmaze_id, season, number) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/getEpisodeInfo`, { email_address, session, tvmaze_id, season, number })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.GET_EPISODE_INFO_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.GET_EPISODE_INFO_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.GET_EPISODE_INFO_FAILURE, payload: message }
    }
};

function updateEpisodeWatchlist(tvmaze_id, episode, addEpisode) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/updateEpisodeList`, { email_address, session, tvmaze_id, episode, addEpisode })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.UPDATE_EPISODE_LIST_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.UPDATE_EPISODE_LIST_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.UPDATE_EPISODE_LIST_FAILURE, payload: message }
    }
};

function removeShowFromList(tvmaze_id) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/removeShowFromList`, { email_address, session, tvmaze_id })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.REMOVE_SHOW_FROM_LIST_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.REMOVE_SHOW_FROM_LIST_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.REMOVE_SHOW_FROM_LIST_FAILURE, payload: message }
    }
};

function toggleNewEpisodeNotification(tvmaze_id) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/toggleNotification`, { email_address, session, tvmaze_id })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_FAILURE, payload: message }
    }
};

function updateInfo(field, update) {
    let userInfo = getUserInfo();
    let email_address = userInfo[0];
    let session = userInfo[1];

    return dispatch => {
        dispatch(request());

        return Axios.post(`${userAction}/updateInfo`, { email_address, session, field, update })

            .then(function (response) {
                dispatch(success(response.data))
            })

            .catch(function (error) {
                dispatch(failure(error.data))
            })
    }

    function request() {
        return { type: userActionsConstants.UPDATE_INFO_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.UPDATE_INFO_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.UPDATE_INFO_FAILURE, payload: message }
    }
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
        return { type: userActionsConstants.DELETE_ACCOUNT_REQUEST }
    }

    function success(message) {
        return { type: userActionsConstants.DELETE_ACCOUNT_SUCCESS, payload: message }
    }

    function failure(message) {
        return { type: userActionsConstants.DELETE_ACCOUNT_FAILURE, payload: message }
    }

}