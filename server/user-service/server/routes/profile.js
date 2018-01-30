'use strict'

const httpStatus = require('http-status')
const express = require('express')
const profileModel = require('../../model/profile')
const router = express.Router()


// get profile list
router.get('/getList', async (req, res) => {
    const listaProfili = await profileModel.getList()
    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: listaProfili })
})

// get profile by id
router.post('/getById/:idprofilo', async (req, res) => {
    const idprofilo = req.body.idprofilo
    const profilo = await profileModel.getById(idprofilo)
    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: profilo })
})


module.exports = router