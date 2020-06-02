const { Pool, Client } = require('pg');

const pool = new Pool({
    host: process.env.PGHost || 'localhost',
    port: process.env.PGPort || 5432,
    database: process.env.PGDatabase || 'tvtracker',
    user: process.env.PGUser || 'brianprice'
})

const shows = {

    searchForShow: (tvmaze_id) =>
        pool.query(
            `SELECT * FROM shows where tvmaze_id='${tvmaze_id}'`
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
        )

}

module.exports = shows;