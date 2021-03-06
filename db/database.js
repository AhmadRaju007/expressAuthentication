require('dotenv').config();

module.exports = {
    'connection': {
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'password': process.env.DB_PASSWORD
    },
    'database': process.env.DB_NAME,
    'users_table': 'users',
    'logs_table': 'logs',
    'sites_table': 'sites',
};