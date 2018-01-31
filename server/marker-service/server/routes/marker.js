'use strict'

const httpStatus = require('http-status')
const express = require('express')
const markerModel = require('../../model/marker')
const markertypeModel = require('../../model/markertype')
const router = express.Router()


// get markers by idutente
router.get('/getMarkers/:idutente', async (req, res) => {
    const idutente = req.params.idutente
    const listaMarcature = await markerModel.findByIdutente(idutente)
    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: listaMarcature })
})

// add marker
router.post('/add', async (req, res) => {
    const params = req.body.params
    const idutente = params.idutente
    const idmarcaturatipo = params.idmarcaturatipo

    const d = new Date()

    let dd = d.getDate()
    let mm = (d.getMonth() + 1)
    const yyyy = d.getFullYear()
    if(dd < 10) dd = '0' + dd
    if(mm < 10) mm = '0' + mm
    const giorno = dd + '/' + mm + '/' + yyyy

    let hh = d.getHours()
    let ms = d.getMinutes()
    if(hh < 10) hh = '0' + hh
    if(ms < 10) ms = '0' + ms
    const ora = hh + ':' + ms

    const rows = await markerModel.add(idutente, idmarcaturatipo, giorno, ora)
    if(rows > 0) res.status(httpStatus.OK).json({ success: true, message: 'Ok' })
    else res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Error' })
})


// get marker type list
router.get('/getMarkerTypeList', async (req, res) => {
    const listaTipoMarcatura = await markertypeModel.getList()
    res.status(httpStatus.OK).json({ success: true, message: 'Ok', data: listaTipoMarcatura })
})


module.exports = router