require('dotenv').config()

module.exports = { 
    development: {
        "username": "root",
        "password": process.env.MYSQL_ROOT_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_DATABASE_HOSTNAME,
        "dialect": "mysql"
    },
    test: {
        "username": "root",
        "password": process.env.MYSQL_ROOT_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_DATABASE_HOSTNAME,
        "dialect": "mysql"
    },
    production: {
        "username": "root",
        "password": process.env.MYSQL_ROOT_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_DATABASE_HOSTNAME,
        "dialect": "mysql"
    }
  };