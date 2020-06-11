const { searchbyShowName, queryForShowEpisodes, queryForEpisodeInfo } = require('../utils/tvmaze');
const { hashPassword } = require('../utils/hashFunctions')
const showQueries = require('../../database/queries/shows');
const userShowQueries = require('../../database/queries/users_shows');
const userQueries = require('../../database/queries/users');

const userActionControllers = {

    searchForShow: async function (req, res) {
        let search = req.body.search;
        try {
            let searchResults = await searchbyShowName(search);
            let results = searchResults
            res.send({ results })
        }
        catch (err) {
            res.status(404).send(err)
        }
    },

    addShowToList: async function (req, res) {
        let { tvmaze_id, name, email_address } = req.body;
        try {
            let databaseSearch = await showQueries.searchForShow(tvmaze_id);
            if (databaseSearch.rows.length === 0) {
                databaseSearch = await queryForShowEpisodes(tvmaze_id);
                let createShow = await showQueries.addNewShow(tvmaze_id, name, databaseSearch)
            }
            let userId = await userQueries.getUser(email_address);
            userId = userId.rows[0].id;
            let showId = await showQueries.searchForShow(tvmaze_id);
            episodes = showId.rows[0].episodes;
            showId = showId.rows[0].id;
            let userLikeShow = await userShowQueries.addShowToUserList(userId, showId, false)
            res.send({ name, tvmaze_id, episodes })
        }
        catch (err) {
            res.status(404).send(err)
        }
    },

    getEpisodeInfo: async function (req, res) {
        let { tvmaze_id, season, number } = req.body;
        try {
            let episodeInfo = await queryForEpisodeInfo(tvmaze_id, season, number)
            res.send({ episodeInfo })
        }
        catch (err) {
            res.status(404).send(err)
        }
    },

    updateEpisodeList: async function (req, res) {
        let { email_address, tvmaze_id, episode, addEpisode } = req.body;
        let userId = await userQueries.getUser(email_address);
        userId = userId.rows[0].id;
        let showId = await showQueries.searchForShow(tvmaze_id);
        showName = showId.rows[0].name;
        showId = showId.rows[0].id;
        try {
            if (addEpisode) {
                let addEpisode = await userShowQueries.addEpisodeWatched(userId, showId, episode)
            } else if (!addEpisode) {
                let removeEpisode = await userShowQueries.removeEpisodeWatched(userId, showId, episode)
            }
            let update = addEpisode ? 'add' : 'remove'
            res.send({ tvmaze_id, episode })
        }
        catch (err) {
            res.status(404).send(err)
        }
    },

    removeShow: async function (req, res) {
        let { tvmaze_id, email_address } = req.body
        try {
            let userId = await userQueries.getUser(email_address);
            userId = userId.rows[0].id;
            let showId = await showQueries.searchForShow(tvmaze_id);
            showName = showId.rows[0].name;
            showId = showId.rows[0].id;
            let removeShow = await userShowQueries.removeShowFromUserList(userId, showId)
            res.send({ tvmaze_id })
        }
        catch (err) {
            res.status(404).send(err)
        }
    },

    toggleNotification: async function (req, res) {
        let { tvmaze_id, email_address } = req.body
        try {
            let userId = await userQueries.getUser(email_address);
            userId = userId.rows[0].id;
            let showId = await showQueries.searchForShow(tvmaze_id);
            showName = showId.rows[0].name;
            showId = showId.rows[0].id;
            let removeShow = await userShowQueries.toggleShowNotification(userId, showId)
            res.send({ tvmaze_id })
        }
        catch (err) {
            res.status(404).send(err)
        }
    },

    updateInfo: async function (req, res) {
        let { email_address, field, update } = req.body;
        try {
            if (field === 'email') {
                let emailUpdate = await userQueries.editUserEmail(email_address, update)
            } else if (field === 'password') {
                let hashedPassword = await hashPassword(update)
                let passwordUpdate = await userQueries.editUserPassword(email_address, hashedPassword)
            }
            res.send({ field, update })
        }
        catch (err) {
            res.status(404).send(err)
        }
    },

    deleteAccount: async function (req, res) {
        let email_address = req.body.email_address;
        try {
            let deleteUser = await userQueries.deleteUser(email_address)
            res.send({ message: 'Account deleted' })
        }
        catch (err) {
            res.status(404).send(err)
        }
    }

}

module.exports = userActionControllers