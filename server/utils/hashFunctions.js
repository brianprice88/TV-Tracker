const bcrypt = require('bcrypt');

const hashFunctions = {
    
    hashPassword: (password) => {
        return new Promise((resolve, reject) =>
            bcrypt.hash(password, 10, (err, hash) => {
                err ? reject(err) : resolve(hash)
            })
        )
    },

    comparePasswords: (userPassword, databasedPassword) => {
        return new Promise((resolve, reject) =>
            bcrypt.compare(userPassword, databasedPassword, (err, response) => {
                err ? reject(err) : resolve(response)
            })
        )
    }

}

module.exports = hashFunctions;