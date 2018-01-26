'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get profiles list
router.get('/', function (req, res) {

    requestManager.doGet({ uri: '/profile/list' }).then((response) => {
        let options = {}
        if(response.success) {
            const data = response.data
            const message = response.message
            res.status(httpStatus.OK).json({ lista: data })
        } else {
            console.log('-- Errore')
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ lista: null })
        }
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router