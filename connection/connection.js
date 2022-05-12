const mysql= require('mysql2');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123#@!',
    database: 'rxcoders1'
})