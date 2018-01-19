'use strict'

const httpStatus = require('http-status')
const passport = require('passport')


module.exports = function(app) {
    let init

    init = () => {
        app.all('*', (req, res, next) => {
            console.log('--- request -> ' + req.originalUrl)
            return next()
        })


        app.use('/auth', require('./api/auth'))


        /* app.all('/*', function (req, res) {
            res
            .status(httpStatus.BAD_GATEWAY)
            .json({ success: false, error: 'Bad gateway' })
        }) */
    }

    return {
        init: init
    }
}