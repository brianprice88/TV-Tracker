import {combineReducers} from 'redux';
import authenticationReducer from './authenticationReducer';
import userActionsReducer from './userActionsReducer'

const rootReducer = combineReducers({
    authenticationReducer,
    userActionsReducer
})

export default rootReducer