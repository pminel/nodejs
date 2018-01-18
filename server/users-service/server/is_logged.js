'use strict'

const jwt = require('jsonwebtoken')
const status = require('http-status')

module.exports = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    if(token) {
        jwt.verify(token, 'my_token', function(err, decoded) {
            if(err) {
                console.log('Unauthorized')
                return res.status(status.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' })
            }
            req.decoded = decoded
            next()
        })
    }
    else {
        console.log('Unauthorized')
        return res.status(status.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' })
    }
}