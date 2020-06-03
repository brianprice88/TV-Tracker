const authenticationRouter = require('express').Router();
const authenticationControllers = require('../controllers/authenticationControllers')
const { verifySession } = require('../utils/sessionVerifier')

authenticationRouter.use('/signOut', verifySession) // only this request will be after user is assigned a session

authenticationRouter
  .route('/signUp')
  .post(authenticationControllers.signUp)

authenticationRouter
  .route('/signIn')
  .post(authenticationControllers.signIn)

authenticationRouter
  .route('/forgotPassword/:email')
  .get(authenticationControllers.getSecurityQuestion)

authenticationRouter
  .route('/checkSecurityAnswer')
  .post(authenticationControllers.checkSecurityAnswer)

authenticationRouter
  .route('/signOut')
  .post(authenticationControllers.signOut)

module.exports = authenticationRouter