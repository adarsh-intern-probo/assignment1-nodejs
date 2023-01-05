/*------- This file contains the config setup between SQL DB and NodeJS server ------*/
require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: MYSQL_DB
});

module.exports = connection.connect(function(err) {
    return err ? console.error("error : " + err.message) : console.log("Connected to the mySQL server"); 
});