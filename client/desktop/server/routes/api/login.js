'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const request = require('request-promise')


const fs = require('fs')
const path = require('path')
const certFile = path.resolve(__dirname, '../../../ssl/pminel.cert')
const keyFile = path.resolve(__dirname, '../../../ssl/pminel.key')


// get login page
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Pagina di accesso'
    })
})

// do login into pminel app
router.post('/doLogin', function (req, res) {
    const username = req.body.username
    const password = req.body.password

    request({
        method: 'post',
        uri: 'https://localhost:8443/auth',
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
        body: {
            username: username,
            password: password
        },
        json: true
    }).then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router