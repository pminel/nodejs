'use strict'

const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
let routes


module.exports = function() {
    let app, config
    let create, init, start, initRoutes

    create = function(conf) {
        config = conf
        app = express()
    }

    init = function() {
        app.set('env', config.server.env)
        app.set('host', config.server.host)
        app.set('port', config.server.port)

        app.use(express.static(path.join(__dirname, '../public')))

        app.set('views', path.join(__dirname, '../views'))
        app.set('view engine', 'pug')

        app.use(bodyparser.json())
        app.use(bodyparser.urlencoded({ extended: false }))
    }

    start = function() {
        const host = app.get('host')
        const port = app.get('port')

        app.listen(port, function() {
            console.log('=== Desktop client started ===')
            console.log('=== listening on http://' + host + ':' + port + ' ===')
            console.log('')
            initRoutes()
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