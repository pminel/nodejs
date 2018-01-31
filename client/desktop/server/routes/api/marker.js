'use strict'

const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const requestManager = require('../../request-manager')


// get marker main page
router.get('/', (req, res) => { res.redirect('/marker/main') });

// get marker main page
router.get('/main', async (req, res) => {
    const idutente = req.session.utente.idutente
    const listaMarcature = await requestManager.doGet({ uri: '/marker/getMarkers/' + idutente })
    const data = { listaMarcature: listaMarcature }
    res.render('marker/main', { title: 'Dati marcature', data: data })
})

// add marker page
router.get('/add', async (req, res) => {
    const listaTipoMarcatura = await requestManager.doGet({ uri: '/marker/getMarkerTypeList' })
    const data = { listaTipoMarcatura: listaTipoMarcatura }
    res.render('marker/add', { title: 'Nuova marcatura', data: data })
})

// do add marker
router.post('/doAdd', async (req, res) => {
    const idutente = req.session.utente.idutente

    const idmarcaturatipo = req.body.idmarcaturatipo
    const params = { idutente: idutente, idmarcaturatipo: idmarcaturatipo }

    const result = await requestManager.doPost({ uri: '/marker/add', body: params })
    console.log(result)

    res.status(httpStatus.OK).json({ success: true, message: 'Marker added', data: result, redirectTo: '/marker/main' })
})


module.exports = router