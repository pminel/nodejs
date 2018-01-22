'use strict'

const httpStatus = require('http-status')
const passport = require('passport')

const proxy = require('http-proxy-middleware')
const restream = function(proxyReq, req, res, options) {
    if (req.method == 'POST' && req.body) {
        let bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type','application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
}
let userProxy = proxy({ target: 'http://localhost:8500', changeOrigin: true, onProxyReq: restream })


module.exports = function(app) {
    let init

    init = () => {
        app.all('*', (req, res, next) => {
            console.log('--- request -> ' + req.originalUrl)
            return next()
        })


        app.use('/auth', require('./api/auth'))

        app.use('/user', passport.authenticate('local', { session: false, failureRedirect: '/auth/noauth' }), userProxy)
    }

    return {
        init: init
    }
}