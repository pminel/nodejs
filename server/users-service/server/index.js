'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

module.exports = function() {
    let server = express()
    let serverConfig, dbConfig

    let create = function(config) {
        serverConfig = config.serverConfig
        dbConfig = config.dbConfig

        server.set('env', serverConfig.env)
        server.set('port', serverConfig.port)
        server.set('hostname', serverConfig.hostname)

        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({ extended: false }))
    }

    let start = function() {
        let hostname = server.get('hostname')
        let port = server.get('port')

        const db = require('../db/db')(dbConfig[serverConfig.env])
        db.connect().then(() => {
            console.log('--- db connected ---')

            let routes = require('./routes')
            routes.init(server, db);

            server.listen(port, function() {
                console.log('--- Users service ---')
                console.log('--- http://' + hostname + ':' + port + ' ---')
                console.log('')
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    return {
        create: create,
        start: start
    }
}