const { searchbyShowName, getShowEpisodes } = require('../utils/tvmaze')


const userActionControllers = {

    searchForShow: async function (req, res) {
        let search = req.body.search;
        try {
            let searchResults = await searchbyShowName(search);
            let results = searchResults
            res.status(200).send({results})
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    getShowEpisodes: async function (req, res) {

    }

}

module.exports = userActionControllers