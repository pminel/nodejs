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
    res
    .status(httpStatus.UNAUTHORIZED)
    .json({ success: false, message: 'Unauthorized' })
})

// authenticate
router.post('/', passport.authenticate('local', { session: false, failureRedirect: '/auth/noauth' }), function (req, res) {
    res.status(httpStatus.OK).json({ success: true, message: 'User logged in', token: req.user })
})


module.exports = router