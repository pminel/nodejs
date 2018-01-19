/* 'use strict'

const crypto = require('crypto')
const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const userModel = require('../model/user')


passport.use(new Strategy(
    function(username, password, cb) {

        // extract user by username
        userModel.findByUsername(username).then((rows) => {
            if(rows == null || rows.length != 1) return cb(null, false, { error: 'No user identified by username=' + username })
            else {
                const rowUtente = rows[0]
                
                // extract last user password
                userModel.getLastPassword(rowUtente.idutente).then((rows) => {
                    if(rows == null || rows.length != 1) return cb(null, false, { erro: 'No last password for username=' + username })
                    else {
                        const rowPassword = rows[0]
                        const lastPassword = rowPassword.password
                        const hashPassword = hashText(password)
    
                        // check if last password is equal to hash of given password
                        if(lastPassword === hashPassword) {
                            const token = {
                                idutente: rowUtente.idutente,
                                username: rowUtente.username,
                                nome: rowUtente.nome,
                                cognome: rowUtente.cognome,
                                email: rowUtente.email
                            }
                            return cb(null, token)
                        }
                        else return cb(null, false, { error: 'Password incorrect for username=' + username })
                    }
                }).catch((error) => {
                    console.log(error)
                    return cb(null, false, { error: 'Database communication error' })
                })
            }
        }).catch((error) => {
            console.log(error)
            return cb(null, false, { error: 'Database communication error' })
        })
    }
))


function hashText(text) {
    const hash = crypto.createHash('sha1');
    hash.update(text, 'utf8');
    return hash.digest('base64');
} */