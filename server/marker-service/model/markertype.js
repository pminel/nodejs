'use strict'

const dbmysql = require('../database/mysql')


module.exports.getList = () => {
    const query = 'SELECT * FROM marcaturatipo ORDER BY nome'
    const params = []

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const rows = JSON.parse(JSON.stringify(raw))
            resolve(rows)
        })
    })
}

/* module.exports.findByIdutente = (idutente) => {
    const query = 'SELECT * FROM marcatura WHERE idutente=? ORDER BY dataora'
    const params = [idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const rows = JSON.parse(JSON.stringify(raw))
            resolve(rows)
        })
    })
}

module.exports.getLast = (idutente) => {
    const query = 'SELECT * FROM marcatura WHERE idutente=? AND dataora=(SELECT MAX(dataora) FROM marcatura WHERE idutente=?)'
    const params = [idutente, idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) reject(err)
            const rows = JSON.parse(JSON.stringify(raw))
            const row = rows[0]
            resolve(row)
        })
    })
} */