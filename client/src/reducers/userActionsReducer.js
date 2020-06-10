import { userActionsConstants } from '../actions/userActions/constants'

function copyState(state) {
    return JSON.parse(JSON.stringify(state))
}

const initialState = {
    alert: null,
    isLoading: false,
    showSearchResults: null,
    user: null,
    shows: null
    }

export default function userActions(state = initialState, action) {
    switch (action.type) {
        case userActionsConstants.SEARCH_FOR_SHOW_REQUEST:
            let showSearchReq = copyState(state);
            showSearchReq.isLoading = true;
            return showSearchReq;

        case userActionsConstants.SEARCH_FOR_SHOW_SUCCESS:
            let showSearchSuccess = copyState(state);
            showSearchSuccess.isLoading = false;
            showSearchSuccess.showSearchResults = action.payload;
            return showSearchSuccess;

        case userActionsConstants.SEARCH_FOR_SHOW_FAILURE:
            let showSearchFail = copyState(state);
            showSearchFail.isLoading = false;
            showSearchFail.alert = action.payload;
            return showSearchFail;

        case userActionsConstants.ADD_SHOW_TO_LIST_REQUEST:
            let addShowReq = copyState(state);
            addShowReq.isLoading = true;
            return addShowReq;

        case userActionsConstants.ADD_SHOW_TO_LIST_SUCCESS:
            let addShowSuccess = copyState(state);
            addShowSuccess.isLoading = false;
            let { tv_maze_id, name, episodes } = action.payload;
            addShowSuccess.shows[name] = {
                tv_maze_id: tv_maze_id,
                notification: false,
                episodes: episodes
            }
            return addShowSuccess;

        case userActionsConstants.ADD_SHOW_TO_LIST_FAILURE:
            let addShowFail = copyState(state);
            addShowFail.isLoading = false;
            addShowFail.alert = action.payload;
            return addShowFail;

        case userActionsConstants.GET_EPISODE_INFO_REQUEST:
            let getEpReq = copyState(state);
            getEpReq.isLoading = true;
            return getEpReq;

        case userActionsConstants.GET_EPISODE_INFO_SUCCESS:
            let getEpSuccess = copyState(state);
            getEpSuccess.isLoading = false;
            getEpSuccess.alert = action.payload; // alert the episodes info or just display it elsewhere?
            return getEpSuccess;

        case userActionsConstants.GET_EPISODE_INFO_FAILURE:
            let getEpFail = copyState(state);
            getEpFail.isLoading = false;
            getEpFail.alert = action.payload;
            return getEpFail;

        case userActionsConstants.UPDATE_EPISODE_LIST_REQUEST:
            let updateEpReq = copyState(state);
            updateEpReq.isLoading = true;
            return updateEpReq;

        case userActionsConstants.UPDATE_EPISODE_LIST_SUCCESS:
            let updateEpSuccess = copyState(state);
            updateEpSuccess.isLoading = false;
            let EpNumber = action.payload.episode;
            let showId = action.payload.tv_maze_id;
            for (var show in updateEpSuccess.shows) {
                if (show.tv_maze_id === showId) {
                    let episodes = show.episodes
                    for (var ep in episodes) {
                        if (ep === EpNumber) {
                            EpNumber[ep] = !EpNumber[ep]
                        }
                    }
                }
            }
            return updateEpSuccess

        case userActionsConstants.UPDATE_EPISODE_LIST_FAILURE:
            let updateEpFail = copyState(state)
            updateEpFail.isLoading = false;
            updateEpFail.alert = action.payload;
            return updateEpFail;

        case userActionsConstants.REMOVE_SHOW_FROM_LIST_REQUEST:
            let removeShowReq = copyState(state);
            removeShowReq.isLoading = true;
            return removeShowReq;

        case userActionsConstants.REMOVE_SHOW_FROM_LIST_SUCCESS:
            let removeShowSuccess = copyState(state);
            removeShowSuccess.isLoading = false;
            let removeId = action.payload.tv_maze_id;
            for (var tvShow in removeShowSuccess.shows) {
                if (show.tv_maze_id === removeId) {
                    delete removeShowSuccess.shows[tvShow];
                }
            }
            return removeShowSuccess

        case userActionsConstants.REMOVE_SHOW_FROM_LIST_FAILURE:
            let removeShowFailure = copyState(state);
            removeShowFailure.isLoading = false;
            removeShowFailure.alert = action.payload;
            return removeShowFailure;

        case userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_REQUEST:
            let toggleReq = copyState(state);
            toggleReq.isLoading = true;
            return toggleReq;

        case userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_SUCCESS:
            let toggleSuccess = copyState(state);
            toggleSuccess.isLoading = false;
            let toggleId = action.payload.tv_maze_id;
            for (var userShow in toggleSuccess.shows) {
                if (show.tv_maze_id === toggleId) {
                    userShow.notification = !userShow.notification
                }
            }
            return toggleSuccess;

        case userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_FAILURE:
            let toggleFail = copyState(state);
            toggleFail.isLoading = false;
            toggleFail.alert = action.payload;
            return toggleFail;

        case userActionsConstants.UPDATE_INFO_REQUEST:
            let updateReq = copyState(state);
            updateReq.isLoading = true;
            return updateReq;

        case userActionsConstants.UPDATE_INFO_SUCCESS:
            let updateSuccess = copyState(state);
            updateSuccess.isLoading = false;
            let { field, update } = action.payload;
            updateSuccess.alert = `${field} update successful!`;
            if (field === 'email') {
                updateSuccess.user.email_address = update;
            }
            return updateSuccess;

        case userActionsConstants.UPDATE_INFO_FAILURE:
            let updateFail = copyState(state);
            updateFail.isLoading = false;
            updateFail.alert = action.payload;
            return updateFail;


        case userActionsConstants.SEND_FEEDBACK_REQUEST:
            let feedbackReq = copyState(state);
            feedbackReq.isLoading = true;
            return feedbackReq;

        case userActionsConstants.SEND_FEEDBACK_SUCCESS:
            let feedbackSuccess = copyState(state);
            feedbackSuccess.isLoading = false;
            feedbackSuccess.alert = action.payload;
            return feedbackSuccess;

        case userActionsConstants.SEND_FEEDBACK_FAILURE:
            let feedbackFailure = copyState(state);
            feedbackFailure.isLoading = false;
            feedbackFailure.alert = action.payload;
            return feedbackFailure;

        case userActionsConstants.DELETE_ACCOUNT_REQUEST:
            let deleteReq = copyState(state);
            deleteReq.isLoading = true;
            return deleteReq;

        case userActionsConstants.DELETE_ACCOUNT_SUCCESS:
            let deleteSuccess = copyState(state);
            deleteSuccess.isLoading = false;
            deleteSuccess.alert = action.payload;
            deleteSuccess.user = null;
            deleteSuccess.shows = null;
            return deleteSuccess;

        case userActionsConstants.DELETE_ACCOUNT_FAILURE:
            let deleteFail = copyState(state);
            deleteFail.isLoading = false;
            deleteFail.alert = action.payload;
            return deleteFail;

        default:
            return state
    }
}