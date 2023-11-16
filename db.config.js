const mysql = require('mysql2')
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database
});

module.exports = connection;