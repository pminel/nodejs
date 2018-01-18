'use strict'

const mysql = require('mysql')

module.exports = function(config) {
    let dbconfig = config
    let manager = {
        pool: null,
        mode: null
    }

    let connect = () => {
        return new Promise((resolve, reject) => {
            try {
                manager.pool = mysql.createPool({
                    host: dbconfig.hostname,
                    port: dbconfig.port,
                    user: dbconfig.user,
                    password: dbconfig.password,
                    database: dbconfig.database
                })
                console.log('--- mysql pool created ---')
                
                manager.mode = dbconfig.mode
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    let get = () => {
        return manager.pool
    }

    return {
        connect: connect,
        get: get
    }
}