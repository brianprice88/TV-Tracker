import store from '../store/store.js'

export function getUserInfo() {
    let state = store.getState();
    let { email_address, session } = state.user;
    return [email_address, session]
}