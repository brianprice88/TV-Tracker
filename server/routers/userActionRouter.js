const userActionRouter = require('express').Router();
const { verifySession } = require('../utils/sessionVerifier');
const userActionControllers = require('../controllers/userActionControllers');
const nodeMailer = require('../utils/nodemailer')

userActionRouter.use(verifySession); // need to verify session token for all these routes

userActionRouter
    .route('/showSearch')
    .post(userActionControllers.searchForShow)

userActionRouter
    .route('/addShowToList')
    .post(userActionControllers.addShowToList)

userActionRouter
    .route('/getEpisodeInfo')
    .post(userActionControllers.getEpisodeInfo)

userActionRouter
    .route('/updateEpisodeList')
    .post(userActionControllers.updateEpisodeList)

userActionRouter
    .route('/removeShowFromList')
    .post(userActionControllers.removeShow)

userActionRouter
    .route('/toggleNotification')
    .post(userActionControllers.toggleNotification)

userActionRouter
    .route('/updateInfo')
    .post(userActionControllers.updateInfo)

userActionRouter
    .route('/sendUserFeedback')
    .post(nodeMailer.sendUserFeedback)

userActionRouter
    .route('/deleteAccount')
    .post(userActionControllers.deleteAccount)


module.exports = userActionRouter