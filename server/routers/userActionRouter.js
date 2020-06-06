const userActionRouter = require('express').Router();
const { verifySession } = require('../utils/sessionVerifier');
const userActionControllers = require('../controllers/userActionControllers');
const nodeMailer = require('../utils/nodemailer')

userActionRouter.use(verifySession); // need to verify session token for all these routes

userActionRouter
    .route('/showSearch')
    .post(userActionControllers.searchForShow)

userActionRouter
    .route('/getShowEpisodes')
    .post(userActionControllers.getShowEpisodes)

userActionRouter
    .route('/getEpisodeInfo')
    .post(userActionControllers.getEpisodeInfo)




userActionRouter
    .route('/sendUserFeedback')
    .post(nodeMailer.sendUserFeedback)


module.exports = userActionRouter