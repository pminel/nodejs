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
router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const utente = await userModel.findByUsername(username)
    const pass = await userModel.getLastPassword(utente.idutente)

    const lastPassword = pass.segreto
    const hashPassword = hashText(password)

    // check if last password is equal to hash of given password
    if(lastPassword === hashPassword) {
        const token = {
            idutente: utente.idutente,
            username: utente.username,
            nome: utente.nome,
            cognome: utente.cognome,
            email: utente.email
        }
        const signed = jwt.sign(token, 'pminel@18')
        res.status(httpStatus.OK).json({ success: true, message: 'User logged in', data: { token: signed, utente: utente } })
    }
    else res.status(httpStatus.OK).json({ success: false, message: 'Password not match' })
})

function hashText(text) {
    const hash = crypto.createHash('sha1');
    hash.update(text, 'utf8');
    return hash.digest('base64');
}


module.exports = router