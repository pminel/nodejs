'use strict'

const dbmysql = require('../database/mysql')


module.exports.findById = (idutente) => {
    const query = 'SELECT * FROM utente WHERE idutente=?'
    const params = [idutente]

    dbmysql.getPool().query(query, params, (err, rows) => {
        if(err) throw(err)
        const jsonRows = JSON.parse(JSON.stringify(rows))
        return jsonRows
    })
}

module.exports.findByUsername = (username) => {
    const query = 'SELECT * FROM utente WHERE username=?'
    const params = [username]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const rows = JSON.parse(JSON.stringify(raw))
            const row = rows[0]
            resolve(row)
        })
    })
}

module.exports.getLastPassword = (idutente) => {
    const query = 'SELECT * FROM password WHERE idutente=? AND datam=(SELECT MAX(datam) FROM password WHERE idutente=?)'
    const params = [idutente, idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) reject(err)
            const rows = JSON.parse(JSON.stringify(raw))
            const row = rows[0]
            resolve(row)
        })
    })
}