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
    async function(jwt_payload, done) {
        const utente = await userModel.findById(jwt_payload.idutente)
        return done(null, {
            idutente: utente.idutente,
            username: utente.username,
            nome: utente.nome,
            cognome: utente.cognome,
            email: utente.email
        })
    }
))