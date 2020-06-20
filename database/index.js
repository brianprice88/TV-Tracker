const { Pool, Client } = require('pg');

if (process.env.DATABASE_URL) {
    let parsedURL = require('url').parse(process.env.DATABASE_URL);
    process.env.HOST = parsedURL.hostname;
    process.env.PORT = parsedURL.port;
    process.env.DATABASE = parsedURL.path.slice(1);
    process.env.USER = parsedURL.auth.split(':')[0];
    process.env.PASSWORD = parsedURL.auth.split(':')[1];
}

const pool = new Pool({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    database: process.env.DATABASE || 'tvtracker',
    user: process.env.USER || 'brianprice',
    password: process.env.PASSWORD || ''
})

pool.connect()
    .then(client =>
        client.query(
            // 'DROP TABLE IF EXISTS users_shows') // create tables anew for testing queries, but delete these lines for deployment so as not to delete data every time changes are made
            // .then(res => client.query('DROP TABLE IF EXISTS users'))
            // .then(res => client.query('DROP TABLE IF EXISTS shows'))
            // .then(res => client.query(
                'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email_address VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, security_question VARCHAR NOT NULL, security_answer VARCHAR NOT NULL, session VARCHAR);'
            )
            // )
            .then(res => client.query(
                'CREATE TABLE IF NOT EXISTS shows(id SERIAL PRIMARY KEY, tvmaze_id INT NOT NULL UNIQUE, name VARCHAR NOT NULL, episodes VARCHAR [] NOT NULL);'
            ))
            .then(res => client.query(
                'CREATE TABLE IF NOT EXISTS users_shows(user_id INT NOT NULL REFERENCES users(id), show_id INT NOT NULL REFERENCES shows(id), notification BOOLEAN NOT NULL, episodes_watched VARCHAR [] NOT NULL, UNIQUE (user_id, show_id));'
            ))
            .then(res => {client.release()})
            .then(res => console.log('connected to database successfully'))
            .catch(err => console.error(err))
            .finally(() => pool.end())
    )