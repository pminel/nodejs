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
        console.log('=== MYSQL Pool open ===')
    } catch(err) {
        console.log(err)
    }
}

module.exports.getPool = () => {
    return pool
}