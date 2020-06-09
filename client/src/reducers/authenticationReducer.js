import { authenticationConstants } from '../actions/authentication/constants'

function copyState(state) {
    return JSON.parse(JSON.stringify(state))
}

export default function authentication(state, action) {
    switch (action.type) {
        case authenticationConstants.SIGNUP_REQUEST:
            let signupReq = copyState(state);
            signupReq.isLoading = true;
            return signupReq

        case authenticationConstants.SIGNUP_RESULT:
            let signupResult = copyState(state);
            signupResult.alert = action.payload;
            signupResult.isLoading = false;
            return signupResult

        case authenticationConstants.SIGNIN_REQUEST:
            let signinReq = copyState(state);
            signinReq.isLoading = true;
            return signinReq;

        case authenticationConstants.SIGNIN_SUCCESS:
            let signinSuccess = copyState(state);
            let { user, shows } = action.payoad;
            signinSuccess.user = user;
            signinSuccess.shows = shows;
            return signinSuccess

        case authenticationConstants.SIGNIN_FAILURE:
            let signinFailure = copyState(state)
            signinFailure.isLoading = false;
            signinFailure.alert = action.payload;
            return signinFailure;

        case authenticationConstants.FORGOT_PASSWORD_REQUEST:
            let forgotReq = copyState(state);
            forgotReq.isLoading = true;
            return forgotReq;

        case authenticationConstants.FORGOT_PASSWORD_SUCCESS:
            let forgotSuccess = copyState(state);
            forgotSuccess.isLoading = false;
            forgotSuccess.prompt = action.payload;
            return forgotSuccess;

        case authenticationConstants.FORGOT_PASSWORD_FAILURE:
            let forgotFailure = copyState(state);
            forgotFailure.isLoading = false;
            forgotFailure.alert = action.payload;
            return forgotFailure;

        case authenticationConstants.CHECK_SECURITY_ANSWER_REQUEST:
            let checkAnswerReq = copyState(state);
            checkAnswerReq.isLoading = true;
            return checkAnswerReq;

        case authenticationConstants.CHECK_SECURITY_ANSWER_SUCCESS:
            let checkAnswerSuccess = copyState(state);
            let { User, Shows } = action.payoad;
            checkAnswerSuccess.user = User;
            checkAnswerSuccess.shows = Shows;
            return checkAnswerSuccess;

        case authenticationConstants.CHECK_SECURITY_ANSWER_FAILURE:
            let checkAnswerFail = copyState(state);
            checkAnswerFail.isLoading = false;
            checkAnswerFail.alert = action.payload;
            return checkAnswerFail

        case authenticationConstants.SIGNOUT_REQUEST:
            let signoutReq = copyState(state);
            signoutReq.isLoading = true;
            return signoutReq;

        case authenticationConstants.SIGNOUT_SUCCESS:
            let signoutSuccess = copyState(state);
            signoutSuccess.isLoading = false;
            signoutSuccess.user = null;
            signoutSuccess.shows = null;
            return signoutSuccess;

        case authenticationConstants.SIGNOUT_FAILURE:
            let signoutFailure = copyState(state);
            signoutFailure.alert = action.payload;
            return signoutFailure;

        default:
            return state
    }
}