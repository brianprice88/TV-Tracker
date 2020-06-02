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
                'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email_address VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, time_zone VARCHAR NOT NULL, security_question VARCHAR NOT NULL, security_answer VARCHAR NOT NULL);'
            ))
            .then(res => client.query(
                'CREATE TABLE IF NOT EXISTS shows(id SERIAL PRIMARY KEY, tvmaze_id INT NOT NULL UNIQUE, name VARCHAR NOT NULL, episodes DECIMAL [] NOT NULL);'
            ))
            .then(res => client.query(
                'CREATE TABLE IF NOT EXISTS users_shows(user_id INT NOT NULL REFERENCES users(id), show_id INT NOT NULL REFERENCES shows(id), notification BOOLEAN NOT NULL, episodes_watched DECIMAL [] NOT NULL, UNIQUE (user_id, show_id));'
            ))
            .then(res => {client.release()})
            .then(res => console.log('connected to database successfully'))
            .catch(err => console.error(err))
            .finally(() => pool.end())
    )

    /*
    
    USERS
    id (primary key)
    email_address
    password
    time_zone
    security_question
    security_answer

    SHOWS
    id (primary key)
    tvmaze_id (id on TV maze)
    name
    episodes: formatted as array of season.episodeNumber (e.g. 1.1, 1.2 --> then these can be parsed to represent season and episode)

    USERS_SHOWS
    user_id (foreign key for USERS.id)
    show_id (foreign key for SHOWS.id)
    notification (true or false) -> email to alert about new episodes
    episodes_watched: formatted as array of season.episodeNumber (e.g. 1.1, 1.2 --> then these can be parsed to represent season and episode)

    */