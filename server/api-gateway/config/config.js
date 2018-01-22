'use strict'

const config = {
    env: 'dev',
    host: 'localhost',
    port: '8443'
}

const mysqlconfig = {
    env: 'dev',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'super',
    database: 'pminel'
    /* host: '10.198.2.115',
    port: '3306',
    user: 'root',
    password: 'm.k$dvd01',
    database: 'emetadata' */
}

module.exports = {
    server: config,
    mysql: mysqlconfig
}