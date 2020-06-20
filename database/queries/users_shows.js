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


const users_shows = {

    findShowsForUser: (userId) =>
        pool.query(
            `SELECT * FROM users_shows where user_id=${userId}`
        ),

    findUsersToNotifyForShow: (showId) =>
        pool.query(
            `SELECT (user_id) FROM users_shows where show_id=${showId} AND notification=true`
        ),

    addShowToUserList: (userId, showId, notification, episodes = []) =>
        pool.query(
            `INSERT INTO users_shows (user_id, show_id, notification, episodes_watched) values ('${userId}', '${showId}', '${notification}', '{${episodes}}')`
        ),

    addEpisodeWatched: (userId, showId, episode) =>
        pool.query(
            `UPDATE users_shows SET episodes_watched = array_append(episodes_watched, '${episode}') WHERE user_id=${userId} and show_id=${showId}`
        ),

    removeEpisodeWatched: (userId, showId, episode) =>
        pool.query(
            `UPDATE users_shows SET episodes_watched = array_remove(episodes_watched, '${episode}') WHERE user_id=${userId} and show_id=${showId}`
        ),

    toggleShowNotification: (userId, showId) =>
        pool.query(
            `UPDATE users_shows SET notification = NOT notification WHERE user_id=${userId} and show_id=${showId}`
        ),

    removeShowFromUserList: (userId, showId) =>
        pool.query(
            `DELETE from users_shows where user_id=${userId} and show_id=${showId}`
        ),

    removeUser: (userId) =>
        pool.query(
            `DELETE from users_shows where user_id='${userId}'`
        ) // This is not used except for testing
        // it deletes user record from this table but not the Users table
        
}

module.exports = users_shows;