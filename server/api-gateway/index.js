'use strict'

const config = require('./config/config')
const server = require('./server/server')()


server.create(config)
server.init()
server.start()