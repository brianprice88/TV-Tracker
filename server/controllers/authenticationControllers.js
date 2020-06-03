const userQueries = require('../../database/queries/users');
const hashFunctions = require('../utils/hashFunctions')

const authenticationControllers = {

    signUp: function (req, res) {
        let { email_address, password, time_zone, security_question, security_answer } = req.body;
        hashFunctions.hashPassword(password)
            .then((hashedPassword) => {
                password = hashedPassword
            })
            .then(() =>
                userQueries.createUser(email_address, password, time_zone, security_question, security_answer)
            )
            .then(response => res.status(200).send(`Account created successfully.  You can now sign in!`))
            .catch(err => res.status(400).send(err))
    },

    signIn: function (req, res) {
        let { email_address, password } = req.body;
        return userQueries.getUser(email_address)
            .then(function (userInfo) {
                if (userInfo.rows.length === 0) {
                    res.status(404).send('Invalid email address')
                } else {
                    let userPassword = userInfo.rows[0].password;
                    hashFunctions.comparePasswords(password, userPassword)
                        .then(function (answer) {
                            if (!answer) {
                                res.status(404).send('Invalid password')
                            } else {
                                res.status(200).send('successful login!')
                            }
                        })
                }
            })
            .catch(err => res.status(400).send(err))
    },

    getSecurityQuestion: function (req, res) {
        let email_address = req.params.email;
        return userQueries.getUser(email_address)
            .then(function (userInfo) {
                if (userInfo.rows.length === 0) {
                    res.status(404).send('That email address does not exist')
                } else {
                    let question = userInfo.rows[0].security_question;
                    res.status(200).send(question)
                }
            })
            .catch(err => res.status(400).send(err))
    },

    checkSecurityAnswer: function (req, res) {
        let { email_address, security_answer } = req.body;
        return userQueries.getUser(email_address)
            .then(function (userInfo) {
                let actualAnswer = userInfo.rows[0].security_answer;
                if (security_answer.toLowerCase() !== actualAnswer.toLowerCase()) { // don't make answers case sensitive
                    res.status(404).send('That answer is incorrect')
                } else {
                    res.status(200).send('Signing you in now.  Please make sure to update your password.')
                }
            })
            .catch(err => res.status(400).send(err))
    },

    signOut: function (req, res) {
        let email_address = req.params.email;
        // delete user session and confirm with user if successful
    }

}

module.exports = authenticationControllers