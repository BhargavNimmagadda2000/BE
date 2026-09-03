const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Batman@202412K!',
    database: 'airbnb',
});

module.exports = pool.promise();