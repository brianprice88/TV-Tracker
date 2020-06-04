const { searchbyShowName, queryForShowEpisodes } = require('../utils/tvmaze')
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

    getShowEpisodes: async function (req, res) {
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
            res.status(200).send({episodes})
        }
        catch (err) {
            res.status(400).send(err)
        }

    }

}

module.exports = userActionControllers