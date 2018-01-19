'use strict'

const mysql = require('mysql')
let config
let pool

module.exports.init = (conf) => {
    config = conf
}

module.exports.connect = () => {
    return new Promise((resolve, reject) => {
        try {
            pool = mysql.createPool(config)
            console.log('=== MYSQL connected ===')

            resolve()
        } catch(error) {
            reject(error)
        }
    })
}

module.exports.getConnection = () => {
    return pool
}