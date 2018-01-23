'use strict'

const config = {
    env: 'dev',
    host: 'localhost',
    port: '8080'
}

const routesconfig = {
    server: {
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || '8080'
    }
}

module.exports = {
    server: config,
    routes: routesconfig
}