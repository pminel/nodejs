'use strict'

const httpStatus = require('http-status')

module.exports = function(app) {
    let routesConfig
    let init

    let userProxy

    init = (routesConf) => {
        routesConfig = routesConf

        app.all('*', (req, res, next) => {
            console.log('')
            console.log('--- request -> ' + req.originalUrl)
            console.log('--- params  -> ' + JSON.stringify(req.body))
            return next()
        })

        app.all('/', (req, res) => {
            res.redirect('/login')
        })

        app.use('/login', require('./api/login'))
        app.use('/main', require('./api/main'))
        app.use('/user', require('./api/user'))
        app.use('/marker', require('./api/marker'))
    }

    return {
        init: init
    }
}