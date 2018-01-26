'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get user page
router.get('/', function (req, res) {

    requestManager.doGet({ uri: '/user/info' }).then((response) => {
        let options = {}
        if(response.success) {
            const data = response.data
            const message = response.message
            options = Object.assign(options, { title: 'Dati utente', data: data, message: message })
        } else {
            const message = response.message
            options = Object.assign(options, { title: 'Errore', data: null, message: message })
        }
        res.render('user', options)

        /* res.render('user', { title: 'Dati utente', message: message }) */
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router