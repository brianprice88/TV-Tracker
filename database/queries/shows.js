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


const shows = {

    searchForShow: (tvmaze_id) =>
        pool.query(
            `SELECT * FROM shows where tvmaze_id='${tvmaze_id}'`
        ),

        getShowfromId: (id) =>
        pool.query(
            `SELECT * FROM shows where id='${id}'`
        ),

    addNewShow: (tvmaze_id, name, episodes) =>
        pool.query(
            `INSERT INTO shows (tvmaze_id, name, episodes) values ('${tvmaze_id}', '${name}', '{${episodes}}')`
        ),

    addNewEpisode: (tvmaze_id, episode) =>
        pool.query(
            `UPDATE shows SET episodes = array_append(episodes, '${episode}') WHERE tvmaze_id = '${tvmaze_id}'`
        ),

    deleteShow: (tvmaze_id) =>
        pool.query(
            `DELETE from shows where tvmaze_id='${tvmaze_id}'`
        ) // This is just for testing purposes
        // since there's no reason not to keep an added show here, for if additional users add it to their list

}

module.exports = shows;