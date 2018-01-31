'use strict'

const config = {
    env: 'dev',
    host: 'localhost',
    port: '8501'
}

const mysqlconfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'pminel'
}

module.exports = {
    server: config,
    mysql: mysqlconfig
}