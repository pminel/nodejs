'use strict'

const dbmysql = require('../database/mysql')


module.exports.getList = async () => {
    const query = 'SELECT * FROM emtprofili ORDER BY nome'

    const res = await dbmysql.getPool().getConnection().then((conn) => {
        const data = conn.query(query)
        conn.release()
        return data
    }).then((result) => {
        var raw = result[0]
        const rows = JSON.parse(JSON.stringify(raw))
        return rows
    })

    return res

    /* return new Promise((resolve, reject) => {
        dbmysql.getConnection().query(query, (err, rows) => {
            if(err) reject(err)
            try {
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            } catch(error) {
                reject(error)
            }
        })
    }) */
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