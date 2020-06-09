import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer.js';

const initialState = {
alert: null,
isLoading: false,
prompt: null,
user: null,
shows: null
}

export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
)