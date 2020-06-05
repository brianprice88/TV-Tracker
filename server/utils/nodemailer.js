const gmail = require('../../nodemailerConfig');
const nodemailer = require('nodemailer');

const { getDailySchedule } = require('./tvmaze.js');
const { searchForShow, addNewEpisode } = require('../../database/queries/shows');
const { findUsersToNotifyForShow } = require('../../database/queries/users_shows');


const nodemailerFunctions = {

    notifyUsers: async function () {
        let showsAiringToday = await getDailySchedule();

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

    sendUserFeedback: function (req, res) {
        let { email_address, message } = req.body
        let user = gmail.user;
        let pass = gmail.password;

        if (process.env.NODE_ENV === 'production') { // for deployment, use the environment variables on Heroku
            user = process.env.user;
            pass = process.env.password
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass
            }
        });

        const mailOptions = {
            from: email_address,
            to: gmail.user,
            subject: `From ${email_address}`,
            text: message
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) { res.status(400).send(err) }
            else { res.status(200).send({ message: `Message sent successfully!` }) }
        })
    }


}

module.exports = nodemailerFunctions