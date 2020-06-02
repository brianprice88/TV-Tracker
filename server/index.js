if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const authenticationRouter = require('./routers/authenticationRouter');
const userActionRouter = require('./routers/userActionRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.use('/authentication', authenticationRouter);
app.use('/userAction', userActionRouter)

module.exports = app;