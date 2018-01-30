'use strict'

const dbmysql = require('../database/mysql')


module.exports.findById = (idutente) => {
    const query = 'SELECT * FROM utente WHERE idutente=?'
    const params = [idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const rows = JSON.parse(JSON.stringify(raw))
            const row = rows[0]
            resolve(row)
        })
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
    const query = 'SELECT * FROM password WHERE idutente=? AND datac=(SELECT MAX(datac) FROM password WHERE idutente=?)'
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

module.exports.updateById = (idutente, nome, cognome, email, idprofilo) => {
    const query = 'UPDATE utente SET nome=?, cognome=?, email=?, idprofilo=? WHERE idutente=?'
    const params = [nome, cognome, email, idprofilo, idutente]

    return new Promise((resolve, reject) => {
        dbmysql.getPool().query(query, params, (err, raw) => {
            if(err) throw(err)
            const result = JSON.parse(JSON.stringify(raw))
            const nrows = result.affectedRows
            resolve(nrows)
        })
    })
}