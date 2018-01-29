'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get user data page
router.get('/', (req, res) => { res.redirect('/getUser') });
router.get('/getUser', (req, res) => {

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
    }).catch((err) => {
        console.log(err)
    })
})


// get edit user password page
router.get('/updatePassword', (req, res) => {
    res.render('password', { title: 'Modifica password' })
})


// do user password update
router.post('/doPasswordUpdate', function (req, res) {
    const actPassword = req.body['act-pwd']
    const newPassword = req.body['new-pwd']
    const newPasswordConfirm = req.body['new-pwd-confirm']

    // check data
    let message = '', errors = {}, valid = true
    if(!actPassword) {
        valid = false
        errors['act-password'] = 'Campo obbligatorio'
        message += 'Password attuale non inserita. '
    }
    if(!newPassword) {
        valid = false
        message += 'Nuova password non inserita.'
    }
    if(!newPasswordConfirm) {
        valid = false
        message += 'Conferma nuova password non inserita.'
    }

    //if(!valid) res.json({ errors: { 'act-password' }, message: message })
})


module.exports = router