'use strict'

const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const httpStatus = require('http-status')
const express = require('express')
const passport = require('passport')
const userModel = require('../../../model/user')
const router = express.Router()


router.get('/', function (req, res) {
    res
    .status(httpStatus.METHOD_NOT_ALLOWED)
    .json({ success: false, error: 'No get method ' + req.originalUrl })
})

router.post('/', function (req, res) {
    const username = req.body.username
    const password = req.body.password

    userModel.findByUsername(username).then((rows) => {
        if(rows == null || rows.length != 1) res.status(httpStatus.BAD_REQUEST).json({ success: false, error: 'No user identified by username=' + username })
        else {
            const rowUtente = rows[0]
            
            userModel.getLastPassword(rowUtente.idutente).then((rows) => {
                if(rows == null || rows.length != 1) res.status(httpStatus.BAD_REQUEST).json({ success: false, error: 'No last password for username=' + username })
                else {
                    const rowPassword = rows[0]
                    const lastPassword = rowPassword.password
                    const hashPassword = hashText(password)

                    if(lastPassword === hashPassword) {
                        const token = {
                            username: rowUtente.username,
                            nome: rowUtente.nome,
                            cognome: rowUtente.cognome,
                            email: rowUtente.email,
                            idutente: rowUtente.idutente
                        }
                        const signed = jwt.sign(token, 'my_token')
                        res.status(httpStatus.OK).json({ success: true, token: signed })
                    }
                    else res.status(httpStatus.BAD_REQUEST).json({ success: false, error: 'Password incorrect for username=' + username })
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }).catch((error) => {
        console.log(error)
    })
})

function hashText(text) {
    const hash = crypto.createHash('sha1');
    hash.update(text, 'utf8');
    return hash.digest('base64');
}

/* router.post('/', passport.authenticate('local', { session: false }), function (req, res) {
    res.status(httpStatus.OK).json({ success: true, messag: 'User logged in' })
}) */

/* router.post('/', function(req, res, next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
        if(err) return next(err)
        if(!user) return res.status(httpStatus.UNAUTHORIZED).send({ success: false, message: info.error })

        req.session = false
        req.logIn(user, (loginErr) => {
            if(loginErr) return next(loginErr)
            return res.send({ success: true, message: 'authentication succeeded' })
        })
    })(req, res, next)

}, function(req, res) {
    res.status(httpStatus.OK).json({ success: true, message: 'User logged in' })
}) */


module.exports = router