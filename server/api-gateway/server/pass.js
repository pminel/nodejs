'use strict'

const jwt = require('jsonwebtoken')
const express = require('express')
const passport = require('passport')
const userModel = require('../model/user')


const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
var opts = {
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
    secretOrKey: 'pminel@18',
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
                return done(null, {
                    idutente: rowUtente.idutente,
                    username: rowUtente.username,
                    nome: rowUtente.nome,
                    cognome: rowUtente.cognome,
                    email: rowUtente.email
                })
            }
        }).catch((error) => {
            console.log(error)
            return done(null, false, { error: 'Database communication error' })
        })
    }
))