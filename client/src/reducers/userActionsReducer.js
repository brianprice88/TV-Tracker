import { userActionsConstants } from '../actions/userActions/constants'

function copyState (state) {
    return JSON.parse(JSON.stringify(state))
}

export default function userActions (state, action) {
    switch (action.type) {
        
        default:
            return state
    }
}