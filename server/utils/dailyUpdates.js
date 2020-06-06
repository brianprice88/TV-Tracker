const { getDailySchedule } = require('./tvmaze.js');

const { searchForShow, addNewEpisode } = require('../../database/queries/shows');
const { findUsersToNotifyForShow } = require('../../database/queries/users_shows');
const { findUserById } = require('../../database/queries/users')

const { notifyUsers } = require('../utils/nodemailer')


const dailyUpdates = {

    checkDatabaseForShow: (tvmaze_id) => {
        return new Promise((resolve, reject) =>
            searchForShow(tvmaze_id)
                .then(data => resolve(data.rows))
                .catch(err => reject(err))
        )
    },

    addNewEpisodeToDatabase: (tvmaze_id, episode) => {
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

    getUserEmail: (id) => {
        return new Promise((resolve, reject) =>
            findUserById(id)
                .then(users => resolve(users.rows))
                .catch(err => reject(err))
        )
    },

    formatTime: (showTime) => {
        let showHour = parseInt(showTime.slice(0, 2));
        let showMinutes = showTime.slice(3, 5);
        if (showHour > 12) {
            showHour -= 12;
            return `${showHour.toString()}:${showMinutes} PM`
        }
        else if (showHour === 0) {
            return `12:${showMinutes} AM`
        }
        else if (showHour === 12) {
            return showTime + ' PM'
        }
        else {
            return showTime + ' AM'
        }
    },


    updateAll: async function () { // THIS AGGREGATE FUNCTION SHOULD BE RUN EACH DAY
        let users = {}; // store email address and relevant info for each user to notify

        let showsAiringToday = await getDailySchedule();

        let outsiderEpisode = {
            showtvmazeId: 39956,
            showName: 'The Outsider',
            episodeName: 'Must/Can\'t',
            season: 1,
            number: 10,
            time: '21:00',
            summary: "<p>The group finds itself in a climactic showdown in their last-ditch effort to root out El Coco.</p>",
            network: 'HBO'
    };

    showsAiringToday.push(outsiderEpisode)


        for (var i = 0; i < showsAiringToday.length; i++) {
            let show = showsAiringToday[i];
            let tvmaze_id = show.showtvmazeId;
            let isShowInDatabase = await this.checkDatabaseForShow(tvmaze_id)
            if (isShowInDatabase.length === 0) { continue; } // if show isn't in database then there can't be any users who want to be notified

            let season = show.season;
            let number = show.number;
            let episode = `${season}.${number}`;
            let addEpisode = await this.addNewEpisodeToDatabase(tvmaze_id, episode);
            let showId = isShowInDatabase[0].id;
            let usersToNotify = await this.getUsersToNofify(showId);
            if (usersToNotify.length === 0) { continue; } // move onto next show if there aren't any users to notify
            for (var i = 0; i < usersToNotify.length; i++) {
                let userToNotify = usersToNotify[i];
                let id = userToNotify.user_id;

                let userInfo = await this.getUserEmail(id);

                let userEmail = userInfo[0].email_address;

                if (users[userEmail] === undefined) {
                    users[userEmail] = [];
                }
                let episodeInfo = {};
                episodeInfo.showName = show.showName
                episodeInfo.episodeName = show.episodeName
                episodeInfo.season = show.season
                episodeInfo.number = show.number;
                episodeInfo.time = this.formatTime(show.time)
                episodeInfo.summary = show.summary;
                episodeInfo.network = show.network;
                users[userEmail].push(episodeInfo)
                console.log(users)
            }

        }
        // for (var i = 0; i < users.length; i++) {
        //     let user = users[i]
        //     notifyUsers(user);
        // }

    }
}

module.exports = dailyUpdates