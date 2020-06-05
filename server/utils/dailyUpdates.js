const { getDailySchedule } = require('./tvmaze.js');

const { searchForShow, addNewEpisode } = require('../../database/queries/shows');
const { findUsersToNotifyForShow } = require('../../database/queries/users_shows');

const {notifyUsers} = require('../utils/nodemailer')


const dailyUpdates = {

    checkDatabaseForShow: (show) => {
        let tvmaze_id = show.showtvmazeId;
        return new Promise((resolve, reject) =>
            searchForShow(tvmaze_id)
                .then(data => resolve(data.rows))
                .catch(err => reject(err))
        )
    },

    addNewEpisodeToDatabase: (show) => {
        let tvmaze_id = show.showtvmazeId;
        let season = show.season;
        let number = show.number;
        let episode = `${season}.${number}`;
        return new Promise((resolve, reject) =>
            addNewEpisode(tvmaze_id, episode)
                .then(response => resolve(response))
                .catch(err => reject(err))
        )
    },

    getUsersToNofify: (showId) => {
        return new Promise((resolve, reject) => 
            findUsersToNotifyForShow(showId)
            .then(users => resolve(users.rows))
            .catch(err => reject(err))   
        )
    },


    updateAll: async function () { // THIS AGGREGATE FUNCTION SHOULD BE RUN EACH DAY
        let users = {}; // store email address and relevant info for each user to notify
        
        let showsAiringToday = await getDailySchedule();

        for (var i = 0; i < showsAiringToday.length; i++) {
            let show = showsAiringToday[i];
            let isShowInDatabase = await this.checkDatabaseForShow(show)
            if (isShowInDatabase.length === 0) {continue;} // if show isn't in database then there can't be any users who want to be notified
            
            let addEpisode = await this.addNewEpisodeToDatabase(show);
            
            let showId = isShowInDatabase.id;
            let usersToNotify = await this.getUsersToNofify(showId);
            if (usersToNotify.length === 0) {continue;} // move onto next show if there aren't any users to notify

            


        }

    }
}

module.exports = dailyUpdates