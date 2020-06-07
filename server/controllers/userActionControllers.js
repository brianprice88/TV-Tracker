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
            res.status(200).send({ results })
        }
        catch (err) {
            res.status(400).send(err)
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
            res.status(200).send({ episodes })
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    getEpisodeInfo: async function (req, res) {
        let { tvmaze_id, season, number } = req.body;
        try {
            let episodeInfo = await queryForEpisodeInfo(tvmaze_id, season, number)
            res.status(200).send({ episodeInfo })
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    updateEpisodeList: async function (req, res) {

    },

    removeShow: async function (req, res) {
        let { tvmaze_id, email_address} = req.body
        try {
            let userId = await userQueries.getUser(email_address);
            userId = userId.rows[0].id;
            let showId = await showQueries.searchForShow(tvmaze_id);
            showName = showId.rows[0].name;
            showId = showId.rows[0].id;
            let removeShow = await userShowQueries.removeShowFromUserList(userId, showId)
            res.status(200).send({message: `${showName} has been removed from your list`})
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    toggleNotification: async function (req, res) {

    },

    updateInfo: async function (req, res) {
        let { email_address, type, update } = req.body;
        try {
            if (type === 'email') {
                let emailUpdate = await userQueries.editUserEmail(email_address, update)
            } else if (type === 'password') {
                let hashedPassword = await hashPassword(update)
                let passwordUpdate = await userQueries.editUserPassword(email_address, hashedPassword)
            }
            res.status(200).send({message: `${type} changed successfully`})
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    deleteAccount: async function (req, res) {
        let email = req.body.email_address;
        try {
            let deleteUser = await userQueries.deleteUser(email)
            res.status(200).send({message: 'Account deleted'})
        }
        catch (err) {
            res.status(400).send(err)
        }
    }

}

module.exports = userActionControllers