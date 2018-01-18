'use strict'

const isLogged = require('./is_logged')
const usersModel = require('../models/users')()

function init(server, db) {
    usersModel.init(db)

    server.get('*', (req, res, next) => {
        console.log('-- ' + req.originalUrl + ' --')
        return next()
    });

    server.all('/users', (req, res) => {
        console.log('Bad gateway')
        res.status(502).json({ success: false, error: 'Bad gateway' })
    });

    server.get('/users/getList', isLogged, (req, res) => {
        usersModel.getAll().then((rows) => {
            res.status(200).json({ success: true, data: rows })
        }).catch((error) => {
            console.log(error)
        })
    })

    server.get('/users/findById/:id', isLogged, (req, res) => {
        const idutente = req.params.id
        usersModel.findById(idutente).then((rows) => {
            res.status(200).json({ success: true, data: rows })
        }).catch((error) => {
            console.log(error)
        })
    })

    server.get('/users/findByUsername/:username', isLogged, (req, res) => {
        const username = req.params.username
        usersModel.findByUsername(username).then((rows) => {
            res.status(200).json({ success: true, data: rows })
        }).catch((error) => {
            console.log(error)
        })
    })

    server.put('/users/add', isLogged, (req, res) => {
        const username = req.params.username
        usersModel.findByUsername(username).then((rows) => {
            res.status(200).json({ success: true, data: rows })
        }).catch((error) => {
            console.log(error)
        })
    })
}

module.exports = {
    init: init
}