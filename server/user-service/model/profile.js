'use strict'

const dbmysql = require('../database/mysql')


module.exports.findById = (idprofilo) => {
    const query = 'SELECT * FROM profilo WHERE idprofilo=?'
    const params = [idprofilo]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const rows = JSON.parse(JSON.stringify(raw))
            const row = rows[0]
            resolve(row)
        })
    })
}

module.exports.getList = (idutente) => {
    const query = 'SELECT * FROM profilo ORDER BY nome'

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, (err, raw) => {
            if(err) reject(err)
            const rows = JSON.parse(JSON.stringify(raw))
            resolve(rows)
        })
    })
}