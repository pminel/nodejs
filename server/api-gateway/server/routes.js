'use strict'

const jwt = require('jsonwebtoken')
const isLogged = require('./is_logged')
const proxy = require('http-proxy-middleware')
const session = require('express-session')
const status = require('http-status')
const crypto = require('crypto')

const restream = function(proxyReq, req, res, options) {
    if(req.body) {
        let bodyData = JSON.stringify(req.body)
        proxyReq.setHeader('Content-Type','application/json')
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
        proxyReq.write(bodyData)
    }
}

function init(server, db) {
    let usersProxy = proxy({ target: 'http://localhost:8500', changeOrigin: true, onProxyReq: restream })

    server.set('trust proxy', 1)
    server.use(session({
        secret: 'my_session',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))

    server.get('*', function (req, res, next) {
        console.log('-- req=' + req.originalUrl + ' --')
        return next()
    });

    server.all('/', function (req, res) {
        res.status(status.BAD_GATEWAY).json({ success: false, error: 'Bad gateway' })
    });


    // authentication
    server.post('/login', (req, res) => {
        const username = req.body.username
        const password = req.body.password
        const params = { username: username, password: password }

        const usersModel = require('../models/users')()
        usersModel.init(db)

        usersModel.findByUsername(username).then((rows) => {
            const rowUtente = rows[0]

            usersModel.getLastPassword(rowUtente.idutente).then((rows) => {
                const rowPassword = rows[0]
                const hash = rowPassword.password
                
                if(hashText(password) === hash) {
                    const token = {
                        username: rowUtente.username,
                        nome: rowUtente.nome,
                        cognome: rowUtente.cognome,
                        email: rowUtente.email,
                        idutente: rowUtente.idutente
                    }
                    const signed = jwt.sign(token, 'my_token')

                    req.session.sign = signed
                    usersProxy.headers = { 'x-access-token': signed }

                    res.status(status.OK).json({ success: true, token: signed })
                }
                else res.status(status.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' })
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
            console.log(error)
        })
    })


    // users proxy
    server.use('/users', isLogged, usersProxy)
}

function hashText(text) {
    const hash = crypto.createHash('sha1');
    hash.update(text, 'utf8');
    return hash.digest('base64');
}

module.exports = {
    init: init
}