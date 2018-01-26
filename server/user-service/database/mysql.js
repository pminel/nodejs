'use strict'

const mysql = require('mysql2/promise')
let config
let pool

module.exports.init = (conf) => {
    config = conf
}

module.exports.connect = () => {
    try {
        pool = mysql.createPool(config)
        console.log('=== MYSQL connected ===')
    } catch(error) {
        console.log(error)
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