import Axios from 'axios';

const base = 'http://localhost:3001' // for development

const authentication = `${base}/authentication`;
const userAction = `${base}/userAction`;

export const signUp = function (parameters) {
    let [email_address, password, security_question, security_answer] = parameters
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/signUp`, { email_address, password, security_question, security_answer })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const signIn = function (parameters) {
    let [email_address, password] = parameters
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/signIn`, { email_address, password })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const getShows = function (parameters) {
    let [email_address, session] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/getShows`, { email_address, session })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
}

export const getSecurityQuestion = function (parameters) {
    let [email_address] = parameters
    return new Promise((resolve, reject) =>
        Axios.get(`${authentication}/forgotPassword/${email_address}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const checkSecurityAnswer = function (parameters) {
    let [email_address, security_answer] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/checkSecurityAnswer`, { email_address, security_answer })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const resetPassword = function (parameters) {
    let [email_address, password] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/resetPassword`, { email_address, password })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
}

export const signOut = function (parameters) {
    let [email_address, session] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/signOut`, { email_address, session })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const searchForShow = function (parameters) {
    let [email_address, session, search] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/showSearch`, { email_address, session, search })
            .then((res) => resolve(res.data.results))
            .catch(err => reject(err))
    )
};

export const addShowToList = function (parameters) {
    let [email_address, session, tvmaze_id, name] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/addShowToList`, { email_address, session, tvmaze_id, name })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const getEpisodeInfo = function (parameters) {
    let [email_address, session, tvmaze_id, season, number] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/getEpisodeInfo`, { email_address, session, tvmaze_id, season, number })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const updateEpisodeList = function (parameters) {
    let [email_address, session, tvmaze_id, episode, addEpisode] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/updateEpisodeList`, { email_address, session, tvmaze_id, episode, addEpisode })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const removeShow = function (parameters) {
    let [email_address, session, tvmaze_id] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/removeShowFromList`, { email_address, session, tvmaze_id })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const toggleNotification = function (parameters) {
    let [email_address, session, tvmaze_id] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/toggleNotification`, { email_address, session, tvmaze_id })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const updateInfo = function (parameters) {
    let [email_address, session, field, update] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/updateInfo`, { email_address, session, field, update })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const sendFeedback = function (parameters) {
    let [email_address, session, message] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/sendUserFeedback`, { email_address, session, message })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const deleteAccount = function (parameters) {
    let [email_address, session] = parameters;
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/deleteAccount`, { email_address, session })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};