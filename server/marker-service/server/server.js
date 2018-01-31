'use strict'

const http = require('http')
const express = require('express')
const bodyparser = require('body-parser')
const dbmysql = require('../database/mysql')
let routes


module.exports = function() {
    let app, config, ssl = { requestCert: false, rejectUnauthorized: false }
    let create, init, start, initRoutes

    create = function(conf) {
        config = conf
        app = express()
    }

    init = function() {
        app.set('env', config.server.env)
        app.set('host', config.server.host)
        app.set('port', config.server.port)

        app.use(bodyparser.json())
        app.use(bodyparser.urlencoded({ extended: false }))
    }

    start = async function() {
        const host = app.get('host')
        const port = app.get('port')

        dbmysql.init(config.mysql)
        await dbmysql.connect()
        app.listen(port, function() {
            console.log('=== Marker service started ===')
            console.log('=== listening on http://' + host + ':' + port + ' ===')
            console.log('')
            initRoutes()
        })
    }

    initRoutes = function() {
        app.all('*', (req, res, next) => {
            console.log('--- request -> ' + req.originalUrl)
            return next()
        })
        
        app.use('/marker', require('./routes/marker'))
    }

    return {
        create: create,
        init: init,
        start: start
    }
}