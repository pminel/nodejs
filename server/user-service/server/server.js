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

        /* const ssl_path = path.join(__dirname, '../ssl/')
        ssl.key = fs.readFileSync(ssl_path + 'pminel.key')
        ssl.cert = fs.readFileSync(ssl_path + 'pminel.cert') */
    }

    start = function() {
        const host = app.get('host')
        const port = app.get('port')

        dbmysql.init(config.mysql)
        dbmysql.connect().then(() => {
            /* https.createServer(ssl, app).listen(port, function() {
                console.log('=== User service started ===')
                console.log('=== listening on https://' + host + ':' + port + ' ===')
                console.log('')
                initRoutes()
            }) */
            http.createServer(app).listen(port, function() {
                console.log('=== User service started ===')
                console.log('=== listening on http://' + host + ':' + port + ' ===')
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
        app.all('*', (req, res, next) => {
            console.log('--- request -> ' + req.originalUrl)
            return next()
        })
        
        app.use('/user', require('./routes/routes'))
    }

    return {
        create: create,
        init: init,
        start: start
    }
}