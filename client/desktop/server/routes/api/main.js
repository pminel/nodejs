'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get main page
router.get('/', function (req, res) {

    requestManager.doGet({ uri: '/user/info' }).then((response) => {
        let options = {}
        if(response.success) {
            const data = response.data
            const message = response.message
            options = Object.assign(options, { title: 'Benvenuto ' + data.nome + ' ' + data.cognome, utente: data, message: message })
        } else {
            const message = response.message
            options = Object.assign(options, { title: 'Errore', utente: null, message: message })
        }
        res.render('main', options)
    }).catch((err) => {
        console.log(err)
    })
})

// do login into pminel app
/* router.post('/doLogin', function (req, res) {
    const username = req.body.username
    const password = req.body.password
    const params = { username: username, password: password }

    requestManager.doPost({ uri: '/auth', body: params }).then((response) => {
        if(response.success) {
            const token = response.token
            requestManager.setToken(token)
            res.redirect('/main')
        } else {
            const message = response.message
            res.redirect('/login?msg=' + message)
        }
    }).catch((err) => {
        console.log(err)
    })
}) */


module.exports = router