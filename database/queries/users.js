const { Pool, Client } = require('pg');

if (process.env.DATABASE_URL) {
    let parsedURL = require('url').parse(process.env.DATABASE_URL);
    process.env.PGHOST = parsedURL.hostname;
    process.env.PGPORT = parsedURL.port;
    process.env.PGDATABASE = parsedURL.path.slice(1);
    process.env.PGUSER = parsedURL.auth.split(':')[0];
    process.env.PGPASSWORD = parsedURL.auth.split(':')[1];
}

const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'tvtracker',
    user: process.env.PGUSER || 'brianprice',
    password: process.env.PGPASSWORD || ''
})


const users = {

    getUser: (email) =>
        pool.query(
            `SELECT * FROM users where email_address='${email}'`
        ),

    findUserById: (id) =>
        pool.query(
            `SELECT email_address from users where id='${id}'`
        ),

    createUser: (email, pass, question, answer) =>
        pool.query(
            `INSERT INTO users (email_address, password, security_question, security_answer) values ('${email}', '${pass}', '${question}', '${answer}')`
        ),

    editUserEmail: (email, newEmail) =>
        pool.query(
            `UPDATE users set email_address='${newEmail}' where email_address='${email}'`
        ),

    editUserPassword: (email, newPassword) =>
        pool.query(
            `UPDATE users set password='${newPassword}' where email_address='${email}'`
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