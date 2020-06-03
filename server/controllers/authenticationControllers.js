const userQueries = require('../../database/queries/users');
const userShowQueries = require('../../database/queries/users_shows')
const { hashPassword, comparePasswords } = require('../utils/hashFunctions')
const { createToken } = require('../utils/sessionCreator')

const authenticationControllers = {

    signUp: async function (req, res) {
        let { email_address, password, time_zone, security_question, security_answer } = req.body;
        try {
            let hashedPassword = await hashPassword(password);
            password = hashedPassword;
            let createUser = await userQueries.createUser(email_address, password, time_zone, security_question, security_answer)
            res.status(200).send({ message: `Account created successfully.  You can now sign in!` })
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    signIn: async function (req, res) {
        let { email_address, password } = req.body;
        try {
            let userInfo = await userQueries.getUser(email_address);
            if (userInfo.rows.length === 0) {
                res.status(404).send({ message: 'Invalid email address' })
            } else {
                let userId = userInfo.rows[0].id
                let userPassword = userInfo.rows[0].password;
                let passwordsMatch = await comparePasswords(password, userPassword);
                if (!passwordsMatch) {
                    res.status(404).send({ message: 'Invalid password' })
                } else {
                    let session = await createToken();
                    let createSession = await userQueries.createSession(email_address, session);
                    let userShows = await userShowQueries.findShowsForUser(userId)
                    let shows = userShows.rows;
                    res.status(200).send({ session, shows })
                }
            }
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    getSecurityQuestion: async function (req, res) {
        let email_address = req.params.email;
        try {
            let userInfo = await userQueries.getUser(email_address);
            if (userInfo.rows.length === 0) {
                res.status(404).send({ message: 'That email address does not exist' })
            } else {
                let question = userInfo.rows[0].security_question;
                res.status(200).send(question)
            }
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    checkSecurityAnswer: async function (req, res) {
        let { email_address, security_answer } = req.body;
        try {
            let userInfo = await userQueries.getUser(email_address);
            let userId = userInfo.rows[0].id;
            let actualAnswer = userInfo.rows[0].security_answer;
            if (security_answer.toLowerCase() !== actualAnswer.toLowerCase()) { // don't make answers case sensitive
                res.status(404).send({ message: 'That answer is incorrect' })
            } else {
                let session = await createToken();
                let createSession = await userQueries.createSession(email_address, session);
                let userShows = await userShowQueries.findShowsForUser(userId)
                let shows = userShows.rows;
                res.status(200).send({ message: 'Signing you in now.  Please make sure to update your password.', session, shows })
            }
        } catch (err) {
            res.status(400).send(err)
        }
    },

    signOut: async function (req, res) {
        let { email_address, session } = req.body
        try {
            let userSession = await userQueries.getSession(email_address);
            if (userSession.rows[0] && userSession.rows[0].session === session) {
                let deleteSession = await userQueries.deleteSession(email_address);
                res.status(200).send({ message: 'You are now signed out' })
            } else {
                res.status(400).send({ message: 'Invalid session' })
            }
        } catch (err) {
            res.status(400).send(err)
        }
    }

}

module.exports = authenticationControllers