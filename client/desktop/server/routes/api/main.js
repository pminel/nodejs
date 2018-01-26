'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get main page
router.get('/', function (req, res) {
    res.render('main', { title: 'Benvenuto', message: null })
})


module.exports = router