const userQueries = require('../../database/queries/users');
const { hashPassword, comparePasswords } = require('../utils/hashFunctions')
const { createToken } = require('../utils/sessionCreator')

const authenticationControllers = {

    signUp: async function (req, res) {
        let { email_address, password, time_zone, security_question, security_answer } = req.body;
        try {
            let hashedPassword = await hashPassword(password);
            password = hashedPassword;
            let createUser = await userQueries.createUser(email_address, password, time_zone, security_question, security_answer)
            res.status(200).send(`Account created successfully.  You can now sign in!`)
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
            res.status(404).send('Invalid email address')
        } else {
            let userPassword = userInfo.rows[0].password;
            let passwordsMatch = await comparePasswords(password, userPassword);
            if (!passwordsMatch) {
                res.status(404).send('Invalid password')
            } else {
                res.status(200).send('successful login!')
            }
        }
        }
        catch (err) {
            res.status(400).send(err)
        }

        //                         let session;
        //                         createToken()
        //                             .then(token => {
        //                                 session = token;
        //                             })
        //                             .then(() =>
        //                                 userQueries.createSession(email_address, session)
        //                                 // .then(response => console.log(response))
        //                             )
        //                         res.status(200).send('successful login!')
        //                     }
        //                 })
        //         }
        //     })
    },

    getSecurityQuestion: async function (req, res) {
        let email_address = req.params.email;
        try {
            let userInfo = await userQueries.getUser(email_address);
            if (userInfo.rows.length === 0) {
                res.status(404).send('That email address does not exist')
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
            let actualAnswer = userInfo.rows[0].security_answer;
            if (security_answer.toLowerCase() !== actualAnswer.toLowerCase()) { // don't make answers case sensitive
                res.status(404).send('That answer is incorrect')
            } else {
                res.status(200).send('Signing you in now.  Please make sure to update your password.')
            }
        } catch (err) {
            res.status(400).send(err)
        }
    },

    signOut: function (req, res) {
        let email_address = req.params.email;
        // delete user session and confirm with user if successful
    }

}

module.exports = authenticationControllers