const mysql = require('mysql2');
const dbconfig = require('./database');

const connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(30) NOT NULL, \
    `password` VARCHAR(255) NOT NULL, \
    `createdAt` datetime DEFAULT CURRENT_TIMESTAMP, \
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\
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
    `createdAt` datetime DEFAULT CURRENT_TIMESTAMP, \
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\
     PRIMARY KEY (`id`)\
)')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.logs_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` varchar(20) NOT NULL,\
    `site_id` int UNSIGNED NOT NULL,\
    `operation` varchar(10) NOT NULL,\
    `createdAt` datetime DEFAULT CURRENT_TIMESTAMP, \
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\
    PRIMARY KEY (`id`),\
    KEY `log_username` (`username`),\
    CONSTRAINT `log_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE RESTRICT \
)');

console.log('Success: Database Created!')

connection.end();