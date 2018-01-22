'use strict'

const dbmysql = require('../database/mysql')


module.exports.findById = (idutente) => {
    const query = 'SELECT * FROM emtutenti WHERE idutente=?'
    const params = [idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getConnection().query(query, params, (err, rows) => {
            if(err) reject(err)
            try {
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            } catch(error) {
                reject(error)
            }
        })
    })
}

module.exports.findByUsername = (username) => {
    const query = 'SELECT * FROM emtutenti WHERE username=?'
    const params = [username]

    return new Promise((resolve, reject) => {
        dbmysql.getConnection().query(query, params, (err, rows) => {
            if(err) reject(err)
            try {
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            } catch(error) {
                reject(error)
            }
        })
    })
}

module.exports.getLastPassword = (idutente) => {
    const query = 'SELECT * FROM emtpassword WHERE idutente=? AND datamodifica=(SELECT MAX(datamodifica) FROM emtpassword WHERE idutente=?)'
    const params = [idutente, idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getConnection().query(query, params, (err, rows) => {
            if(err) reject(err)
            try {
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            } catch(error) {
                reject(error)
            }
        })
    })
}