const { getDailySchedule } = require('./tvmaze.js');
const {searchForShow, addNewEpisode} = require('../../database/queries/shows');
const {findUsersToNotifyForShow} = require('../../database/queries/users_shows')

const nodemailerFunctions = {

    notifyUsers: async function () {
    let showsAiringToday = await getDailySchedule();
    console.log(showsAiringToday)

    // for (var i = 0; i < showsAiringToday.length; i++) {
    //     let show = showsAiringToday[i];
    //     let tvmaze_id = show.showtvmazeId;
    //     let isInDatabase = await searchForShow(tvmaze_id);
    //     if (isInDatabase.rows.length === 0) {
    //         continue;
    //     }

    // }

    // let getRelevantShows = async function (showsAiringToday) {
    //  showsAiringToday.forEach(async function(show){
    //     let tvmaze_id = show.showtvmazeId;
    //   let isInDatabase = await searchForShow(tvmaze_id);
    //   show.isInDatabase = isInDatabase.rows.length !== 0
    //  })
    //  let relevantShows = await Promise.all(showsAiringToday)
    //  return relevantShows
    // }

    // let showsToUpdate = await getRelevantShows(showsAiringToday)

    // console.log(showsToUpdate)
    // let relevantShows = showsAiringToday.filter(async function(show) {
    //   let tvmaze_id = show.showtvmazeId;
    //   let isInDatabase = await searchForShow(tvmaze_id);
    //   return isInDatabase.rows.length !== 0
    // })
    
    // let addNewEpisodes = relevantShows.forEach(async function(show) {
    //   let tvmaze_id = show.showtvmazeId;
    //   let season = show.season;
    //   let number = show.number;
    //   let episode = `${season}.${number}`
    //   let insertEpisode = await addNewEpisode(tvmaze_id, episode)
    // })


},


}

module.exports = nodemailerFunctions