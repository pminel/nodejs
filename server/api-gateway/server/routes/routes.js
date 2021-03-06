'use strict'

const httpStatus = require('http-status')
const passport = require('passport')

const proxy = require('http-proxy-middleware')
const restream = function(proxyReq, req, res, options) {
    let bodyData = JSON.stringify({
        params: req.body || {},
        user: req.user || null
    });
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
}


module.exports = function(app) {
    let routesConfig
    let init

    let userProxy
    let markerProxy

    init = (routesConf) => {
        routesConfig = routesConf
        userProxy = proxy({ target: 'http://' + routesConfig.user_service.host, changeOrigin: true, onProxyReq: restream })
        markerProxy = proxy({ target: 'http://' + routesConfig.marker_service.host, changeOrigin: true, onProxyReq: restream })

        app.all('*', (req, res, next) => {
            console.log('')
            console.log('--- request -> ' + req.originalUrl)
            if(Object.keys(req.body).length != 0) console.log('--- params  -> ' + JSON.stringify(req.body))
            return next()
        })


        app.use('/auth', require('./api/auth'))

        app.use('/user', passport.authenticate('jwt', { session: false, failureRedirect: '/auth/noauth' }), userProxy)
        app.use('/marker', passport.authenticate('jwt', { session: false, failureRedirect: '/auth/noauth' }), markerProxy)
    }

    return {
        init: init
    }
}