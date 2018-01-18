'use strict'

exports.serverConfig = {
    env: 'dev',
    hostname: 'localhost',
    port: '8500'
}

exports.dbConfig = {
    dev: {
        mode: 'dev',
        hostname: '10.198.2.115',
        port: '3306',
        user: 'root',
        password: 'm.k$dvd01',
        database: 'emetadata'
    },
    prod: {
        mode: 'prod',
        hostname: '10.198.2.115',
        port: '3306',
        user: 'root',
        password: 'm.k$dvd01',
        database: 'emetadata'
    }
}