'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get user data page
router.get('/', (req, res) => { res.redirect('/getUser') });

// get user data page
router.get('/getUser', async (req, res) => {
    const utente = await requestManager.doGet({ uri: '/user/getInfo' })
    const listaProfili = await requestManager.doGet({ uri: '/user/getRoleList' })
    const data = { utente: utente, listaProfili: listaProfili }
    res.render('user', { title: 'Dati utente', data: data })
})

// do user data update
router.post('/doUpdateUser', async (req, res) => {
    const idutente = req.session.utente.idutente

    const nome = req.body.nome
    const cognome = req.body.cognome
    const email = req.body.email
    const idprofilo = req.body.idprofilo
    const params = { idutente: idutente, nome: nome, cognome: cognome, email: email, idprofilo: idprofilo }

    const result = await requestManager.doPost({ uri: '/user/update', body: params })

    res.status(httpStatus.OK).json({ success: true, message: 'User updated', data: result, redirectTo: '/user/getUser' })
})




// get edit user password page
router.get('/getPassword', (req, res) => { res.render('password', { title: 'Modifica password' }) })

// do user password update
router.post('/doUpdatePassword', async (req, res) => {
    const idutente = req.session.utente.idutente

    const actPassword = req.body['act-pwd']
    const newPassword = req.body['new-pwd']
    const newPasswordConfirm = req.body['new-pwd-confirm']

    // check new password and re-password
    if(newPassword != newPasswordConfirm) {
        alert('La nuova password e la password di conferma non coincidono.')
        return
    }

    const params = { idutente: idutente, actPassword: actPassword, newPassword: newPassword }
    const result = await requestManager.doPost({ uri: '/user/updatePassword', body: params })
    res.redirect('/user/getUser')
})


module.exports = router