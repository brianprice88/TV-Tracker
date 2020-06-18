const { Pool, Client } = require('pg');

const pool = new Pool({
    host: process.env.PGHost || 'localhost',
    port: process.env.PGPort || 5432,
    database: process.env.PGDatabase || 'tvtracker',
    user: process.env.PGUser || 'brianprice'
})

pool.connect()
    .then(client =>
        client.query(
            'DROP TABLE IF EXISTS users_shows') // create tables anew for testing queries, but delete lines 13-16, 19 for deployment
            .then(res => client.query('DROP TABLE IF EXISTS users'))
            .then(res => client.query('DROP TABLE IF EXISTS shows'))
            .then(res => client.query(
                'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email_address VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, security_question VARCHAR NOT NULL, security_answer VARCHAR NOT NULL, session VARCHAR);'
            ))
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