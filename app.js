const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*------- Importing Routes which are defined in other files ------*/
const usersRoute = require('./routes/users');
const imageRoute = require('./routes/images');

app.use(bodyParser.json());
app.use("/user", usersRoute);
app.use("/images",imageRoute);

module.exports = app;