import { userActionsConstants } from '../actions/userActions/constants'

function copyState(state) {
    return JSON.parse(JSON.stringify(state))
}

export default function userActions(state, action) {
    switch (action.type) {
        case userActionsConstants.SEARCH_FOR_SHOW_REQUEST:

        case userActionsConstants.SEARCH_FOR_SHOW_SUCCESS:

        case userActionsConstants.SEARCH_FOR_SHOW_FAILURE:

        case userActionsConstants.ADD_SHOW_TO_LIST_REQUEST:

        case userActionsConstants.ADD_SHOW_TO_LIST_SUCCESS:

        case userActionsConstants.ADD_SHOW_TO_LIST_FAILURE:

        case userActionsConstants.GET_EPISODE_INFO_REQUEST:

        case userActionsConstants.GET_EPISODE_INFO_SUCCESS:

        case userActionsConstants.GET_EPISODE_INFO_FAILURE:

        case userActionsConstants.UPDATE_EPISODE_LIST_REQUEST:

        case userActionsConstants.UPDATE_EPISODE_LIST_SUCCESS:

        case userActionsConstants.UPDATE_EPISODE_LIST_FAILURE:

        case userActionsConstants.REMOVE_SHOW_FROM_LIST_REQUEST:

        case userActionsConstants.REMOVE_SHOW_FROM_LIST_SUCCESS:

        case userActionsConstants.REMOVE_SHOW_FROM_LIST_FAILURE:

        case userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_REQUEST:

        case userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_SUCCESS:

        case userActionsConstants.TOGGLE_NEW_EPISODE_NOTIFICATION_FAILURE:

        case userActionsConstants.UPDATE_INFO_REQUEST:

        case userActionsConstants.UPDATE_INFO_SUCCESS:

        case userActionsConstants.UPDATE_INFO_FAILURE:

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

        case userActionsConstants.DELETE_ACCOUNT_SUCCESS:

        case userActionsConstants.DELETE_ACCOUNT_FAILURE:

        default:
            return state
    }
}