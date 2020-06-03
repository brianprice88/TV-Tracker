const { verifySession } = require('../utils/sessionVerifier')

const userActionRouter = require('express').Router();

userActionRouter.use(verifySession); // need to verify session token for all these routes

module.exports = userActionRouter