import { alertConstants } from '../actions/alerts/constants'

export function alert(state, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            let successState = JSON.parse(JSON.stringify(state));
            successState.alert = action.message;
            return successState;
        case alertConstants.ERROR:
            let errorState = JSON.parse(JSON.stringify(state));
            errorState.alert = action.message;
            return errorState;
        case alertConstants.CLEAR:
            let clearState = JSON.parse(JSON.stringify(state));
            clearState.alert = null;
            return clearState;
        default:
            return state
    }
}