if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};

const cron = require("node-cron");
const dailyUpdates = require('../server/utils/dailyUpdates');

cron.schedule('5 0 * * *', () => dailyUpdates.updateAll()) // run updates at 12:05am

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const authenticationRouter = require('./routers/authenticationRouter');
const userActionRouter = require('./routers/userActionRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.use('/authentication', authenticationRouter);
app.use('/userAction', userActionRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
}

module.exports = app;