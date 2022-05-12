const mysql = require('mysql2');
const dbconfig = require('./database');

const connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(30) NOT NULL, \
    `password` VARCHAR(255) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC)\
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.sites_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `name` varchar(100) NOT NULL,\
    `jurisdiction` varchar(100) NOT NULL,\
    `description` varchar(250) DEFAULT NULL,\
    `longitude` varchar(10) NOT NULL,\
    `latitude` varchar(10) NOT NULL,\
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP, \
     PRIMARY KEY (`id`)\
)')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.logs_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `user_id` int UNSIGNED NOT NULL,\
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\
    PRIMARY KEY (`id`),\
    KEY `log_users_idx` (`user_id`),\
    CONSTRAINT `log_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT \
)');

console.log('Success: Database Created!')

connection.end();