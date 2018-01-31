'use strict'

const config = {
    env: 'dev',
    host: 'localhost',
    port: '8443'
}

const mysqlconfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'pminel'
}

const routesconfig = {
    user_service: {
        host: process.env.USER_SERVICE_HOST || 'localhost',
        port: process.env.USER_SERVICE_PORT || '8500'
    },
    marker_service: {
        host: process.env.MARKER_SERVICE_HOST || 'localhost',
        port: process.env.MARKER_SERVICE_PORT || '8501'
    }
}

module.exports = {
    server: config,
    mysql: mysqlconfig,
    routes: routesconfig
}