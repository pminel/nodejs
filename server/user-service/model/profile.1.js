'use strict'

const dbmysql = require('../database/mysql')


module.exports.getList = () => {
    const query = 'SELECT * FROM emtprofili'

    return new Promise((resolve, reject) => {
        dbmysql.getConnection().query(query, (err, rows) => {
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

module.exports.findById = (idprofilo) => {
    const query = 'SELECT * FROM emtprofili WHERE idprofilo=?'
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