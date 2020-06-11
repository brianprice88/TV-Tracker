import Axios from 'axios';

const base = 'http://localhost:3001' // for development

const authentication = `${base}/authentication`;
const userAction = `${base}/userAction`;

export const signUp = function (email_address, password, security_question, security_answer) {
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/signUp`, { email_address, password, security_question, security_answer })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const signIn = function (email_address, password) {
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/signIn`, { email_address, password })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const getSecurityQuestion = function (email_address) {
    return new Promise((resolve, reject) =>
        Axios.get(`${authentication}/forgotPassword${email_address}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const checkSecurityAnswer = function (email_address, security_answer) {
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/checkSecurityAnswer`, { email_address, security_answer })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const signOut = function (email_address, session) {
    return new Promise((resolve, reject) =>
        Axios.post(`${authentication}/signOut`, { email_address, session })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const searchForShow = function (email_address, session, search) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/showSearch`, { email_address, session, search })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const addShowToList = function (email_address, session, tvmaze_id, name) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/addShowToList`, { email_address, session, tvmaze_id, name })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const getEpisodeInfo = function (email_address, session, tvmaze_id, season, number) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/getEpisodeInfo`, { email_address, session, tvmaze_id, season, number })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const updateEpisodeList = function (email_address, session, tvmaze_id, episode, addEpisode) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/updateEpisodeList`, { email_address, session, tvmaze_id, episode, addEpisode })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const removeShow = function (email_address, session, tvmaze_id) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/removeShowFromList`, { email_address, session, tvmaze_id })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const toggleNotification = function (email_address, session, tvmaze_id) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/toggleNotification`, { email_address, session, tvmaze_id })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const updateInfo = function (email_address, session, field, update) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/updateInfo`, { email_address, session, field, update })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const sendFeedback = function (email_address, session, message) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/sendUserFeedback`, { email_address, session, message })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};

export const deleteAccount = function (email_address, session) {
    return new Promise((resolve, reject) =>
        Axios.post(`${userAction}/deleteAccount`, { email_address, session })
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    )
};