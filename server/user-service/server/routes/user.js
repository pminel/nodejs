'use strict'

const httpStatus = require('http-status')
const express = require('express')
const userModel = require('../../model/user')
const profileModel = require('../../model/profile')
const router = express.Router()


// get user info
router.get('/getInfo', async (req, res) => {
    const utenteSess = req.body.user
    const id = utenteSess.idutente
    const utente = await userModel.findById(id)
    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: utente })
})

// update user info
router.post('/update', async (req, res) => {
    const params = req.body.params
    const idutente = params.idutente
    const nome = params.nome
    const cognome = params.cognome
    const email = params.email
    const idprofilo = params.idprofilo

    const rows = await userModel.updateById(idutente, nome, cognome, email, idprofilo)
    if(rows > 0) res.status(httpStatus.OK).json({ success: true, message: 'Ok' })
    else res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Error' })
})


// get role list
router.get('/getRoleList', async (req, res) => {
    const listaProfili = await profileModel.getList()
    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: listaProfili })
})

// get role by id
router.post('/getRoleById/:idprofilo', async (req, res) => {
    const idprofilo = req.body.idprofilo
    const profilo = await profileModel.getById(idprofilo)
    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: profilo })
})


module.exports = router