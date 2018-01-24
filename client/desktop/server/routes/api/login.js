'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get login page
router.get('/', function (req, res) {
    const message = req.query.msg
    res.render('index', {
        title: 'Pagina di accesso',
        message: message || null
    })
})

// do login into pminel app
router.post('/doLogin', function (req, res) {
    const username = req.body.username
    const password = req.body.password
    const params = { username: username, password: password }

    //requestManager.execPost({ uri: '/auth', body: params }).then((response) => {
    requestManager.doPost({ uri: '/auth', body: params }).then((response) => {
        if(response.success) {
            const token = response.token
            //requestManager.setToken(token)
            //res.redirect('/main')

            requestManager.doGet({ uri: '/user/info/paolo', headers: { 'x-access-token': token } }).then((response2) => {
                console.log(response2)
            }).catch((err2) => {
                console.log(err2)
            })
        } else {
            const message = response.message
            res.redirect('/login?msg=' + message)
        }
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router