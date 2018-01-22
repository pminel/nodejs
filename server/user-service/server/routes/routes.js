'use strict'

const httpStatus = require('http-status')
const express = require('express')
const userModel = require('../../model/user')
const router = express.Router()


// get user info
router.post('/info', function (req, res) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'No user id param found' })
})
router.post('/info/:id', function (req, res) {
    const id = req.params.id

    if(!isNaN(id)) {
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
    }
})


module.exports = router