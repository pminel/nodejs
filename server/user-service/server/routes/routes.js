'use strict'

const httpStatus = require('http-status')
const express = require('express')
const userModel = require('../../model/user')
const profileModel = require('../../model/profile')
const router = express.Router()


// get user info
router.get('/info', async (req, res) => {
    const utenteSess = req.body.user
    const id = utenteSess.idutente

    let utente
    if(!isNaN(id)) utente = await userModel.findById(id)
    else utente = await userModel.findByUsername(id)

    let listaProfili = await profileModel.getList()

    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: { utente: utente, listaProfili: listaProfili} })

    /* if(!isNaN(id)) {
        userModel.findById(id).then((rows) => {
            if(rows == null || rows.length != 1) res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'No user found' })
            else {
                const utente = rows[0]
                res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: utente })
            }
        }).catch((err) => {
            res.status(httpStatus.BAD_REQUEST).json({ success: true, message: 'Database communication error' })
        })
    }
    else {
        userModel.findByUsername(id).then((rows) => {
            if(rows == null || rows.length != 1) res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'No user found' })
            else {
                const utente = rows[0]
                res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: utente })
            }
        }).catch((err) => {
            res.status(httpStatus.BAD_REQUEST).json({ success: true, message: 'Database communication error' })
        })
    } */
})


module.exports = router