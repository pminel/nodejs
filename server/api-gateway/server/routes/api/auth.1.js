'use strict'

const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const httpStatus = require('http-status')
const express = require('express')
const passport = require('passport')
const userModel = require('../../../model/user')
const router = express.Router()


// redirect to noauth
router.get('/', function (req, res) {
    res.redirect('/auth/noatuh')
})

// noauth
router.get('/noauth', function (req, res) {
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' })
})

// authenticate
/* router.post('/', passport.authenticate('jwt', { session: false, failureRedirect: '/auth/noauth' }), function (req, res) {
    res.status(httpStatus.OK).json({ success: true, message: 'User logged in', token: req.user })
}) */
router.post('/', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    userModel.findByUsername(username).then((rows) => {
        if(rows == null || rows.length != 1) res.status(httpStatus.OK).json({ success: false, message: 'User not found' })
        else {
            // user row
            const rowUtente = rows[0]
            
            // extract last user password
            userModel.getLastPassword(rowUtente.idutente).then((rows) => {
                if(rows == null || rows.length != 1) res.status(httpStatus.OK).json({ success: false, message: 'User password not found' })
                else {
                    // last password row
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
                        const signed = jwt.sign(token, 'pminel@18')
                        res.status(httpStatus.OK).json({ success: true, message: 'User logged in', token: signed })
                    }
                    else res.status(httpStatus.OK).json({ success: false, message: 'Password not match' })
                }
            }).catch((error) => {
                console.log(error)
                res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error' })
            })
        }
    }).catch((error) => {
        console.log(error)
        res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error' })
    })
})

function hashText(text) {
    const hash = crypto.createHash('sha1');
    hash.update(text, 'utf8');
    return hash.digest('base64');
}


module.exports = router