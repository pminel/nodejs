'use strict'

const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const express = require('express')
const passport = require('passport')
const userModel = require('../model/user')


const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
var opts = {
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
    secretOrKey: 'my_token',
    session: false
}

passport.use(new JwtStrategy(opts, 
    function(jwt_payload, done) {
        
        // extract user by id
        userModel.findById(jwt_payload.idutente).then((rows) => {
            if(rows == null || rows.length != 1) return done(null, false, { error: 'No user identified by username=' + username })
            else {
                // user row
                const rowUtente = rows[0]
                return done(null, rowUtente)
            }
        }).catch((error) => {
            console.log(error)
            return done(null, false, { error: 'Database communication error' })
        })
    }
))