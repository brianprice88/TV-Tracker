const { searchbyShowName, getShowEpisodes } = require('../utils/tvmaze')


const userActionControllers = {

    searchForShow: async function (req, res) {
        let search = req.body.search;
        try {
            let searchResults = await searchbyShowName(search);
            res.status(200).send({results: searchResults})
        }
        catch (err) {
            res.status(400).send(err)
        }
    }

}

module.exports = userActionControllers