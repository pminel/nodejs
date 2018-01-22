'use strict'

const https = require('https')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const passport = require('passport')
const dbmysql = require('../database/mysql')
require('./pass')
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

        app.use(passport.initialize())

        app.use(bodyparser.json())
        app.use(bodyparser.urlencoded({ extended: false }))

        const ssl_path = path.join(__dirname, '../ssl/')
        ssl.key = fs.readFileSync(ssl_path + 'pminel.key')
        ssl.cert = fs.readFileSync(ssl_path + 'pminel.cert')
    }

    start = function() {
        const host = app.get('host')
        const port = app.get('port')

        dbmysql.init(config.mysql)
        dbmysql.connect().then(() => {
            https.createServer(ssl, app).listen(port, function() {
                console.log('=== API Gateway started ===')
                console.log('=== listening on https://' + host + ':' + port + ' ===')
                console.log('')
                initRoutes()
            })
        }).catch((err) => {
            console.log('=== db connect error ===')
            console.log(err)
            console.log('========================')
        })
    }

    initRoutes = function() {
        routes = require('./routes/routes')(app)
        routes.init(config.routes)
    }

    return {
        create: create,
        init: init,
        start: start
    }
}