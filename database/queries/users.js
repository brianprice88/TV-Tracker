const { Pool, Client } = require('pg');

const pool = new Pool({
    host: process.env.PGHost || 'localhost',
    port: process.env.PGPort || 5432,
    database: process.env.PGDatabase || 'tvtracker',
    user: process.env.PGUser || 'brianprice'
})

const users = {

    getUser: (email) =>
        pool.query(
            `SELECT * FROM users where email_address='${email}'`
        ),

    createUser: (email, pass, time, question, answer) =>
        pool.query(
            `INSERT INTO users (email_address, password, time_zone, security_question, security_answer) values ('${email}', '${pass}', '${time}', '${question}', '${answer}')`
        ),

    editUserEmail: (email, newEmail) =>
        pool.query(
            `UPDATE users set email_address='${newEmail}' where email_address='${email}'`
        ),

    editUserPassword: (email, newPassword) =>
        pool.query(
            `UPDATE users set password='${newPassword}' where email_address='${email}'`
        ),

    editUserTimezone: (email, newTimezone) =>
        pool.query(
            `UPDATE users set time_zone='${newTimezone}' where email_address='${email}'`
        ),

    deleteUser: (email) =>
        pool.query(
            `DELETE from users_shows where user_id=(SELECT (id) from users where email_address='${email}')`
        )
            .then(res => pool.query(
                `DELETE FROM users where email_address='${email}'`
            )),

    createSession: (email, session) =>
        pool.query(
            `UPDATE users set session='${session}' where email_address='${email}'`
        ),

    getSession: (email) =>
        pool.query(
            `SELECT (session) from users where email_address='${email}'`
        ),

    deleteSession: (email) =>
        pool.query(
            `UPDATE users set session=null where email_address='${email}'`
        ),
}

module.exports = users;