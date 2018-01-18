'use strict'

const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    if(token) {
        jwt.verify(token, 'my_token', function(err, decoded) {
            if(err) return res.status(401).json({ success: false, message: 'Unauthorized' })
            
            req.decoded = decoded
            next()
        })
    } else return res.status(401).json({ success: false, message: 'Unauthorized' })
}