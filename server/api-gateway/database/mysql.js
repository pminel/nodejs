'use strict'

const mysql = require('mysql')
let config
let pool

module.exports.init = (conf) => {
    config = conf
}

module.exports.connect = async () => {
    try {
        pool = await mysql.createPool(config)
        console.log('=== MYSQL created ===')
    } catch(err) {
        console.log(err)
    }
}

/* module.exports.connect = async () => {
    try {
        pool = await mysql.createPool(config)
        console.log('=== MYSQL connected ===')
    } catch(err) {
        pool = null
        console.log(err)
    }
    return
} */

module.exports.getPool = () => {
    return pool
}