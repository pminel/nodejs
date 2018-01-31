'use strict'

const dbmysql = require('../database/mysql')


module.exports.findById = (idmarcatura) => {
    const query = 'SELECT * FROM marcatura WHERE idmarcatura=?'
    const params = [idmarcatura]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const rows = JSON.parse(JSON.stringify(raw))
            const row = rows[0]
            resolve(row)
        })
    })
}

module.exports.findByIdutente = (idutente) => {
    const query = 'SELECT * FROM marcatura WHERE idutente=? ORDER BY giorno, ora'
    const params = [idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const rows = JSON.parse(JSON.stringify(raw))
            resolve(rows)
        })
    })
}

/* module.exports.getLast = (idutente) => {
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


module.exports.add = (idutente, idmarcaturatipo, giorno, ora) => {
    const query = 'INSERT INTO marcatura (idutente, idmarcaturatipo, giorno, ora) VALUES (?, ?, ?, ?)'
    const params = [idutente, idmarcaturatipo, giorno, ora]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const result = JSON.parse(JSON.stringify(raw))
            const nrows = result.affectedRows
            resolve(nrows)
        })
    })
}