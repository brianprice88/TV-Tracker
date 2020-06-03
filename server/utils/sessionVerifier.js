const userQueries = require('../../database/queries/users');

module.exports.verifySession = async function (req, res, next) {
    let { email_address, session } = req.body;
    try {
        let userSession = await userQueries.getSession(email_address);
        if (userSession.rows[0] && userSession.rows[0].session === session) {
            next();
        } else {
            res.status(400).send({ message: 'Invalid session' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}
