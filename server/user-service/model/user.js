'use strict'

const dbmysql = require('../database/mysql')


module.exports.findById = async (idutente) => {
    const query = 'SELECT * FROM emtutenti WHERE idutente=?'
    const params = [idutente]
    let jsonRows = null

    const res = await dbmysql.getPool().getConnection().then((conn) => {
        const data = conn.query(query, params)
        conn.release()
        return data
    }).then((result) => {
        var raw = result[0]
        const rows = JSON.parse(JSON.stringify(raw))
        return rows[0]
    })

    return res

    /* const pool = await dbmysql.getConnection()
    console.log(pool.getConnection())

    const res = pool.getConnection((err, conn) => {
        conn.query(query, params, (err, rows) => {
            console.log(rows)
            if(err) console.log(err)
            try { resolve(JSON.parse(JSON.stringify(rows))) }
            catch(err) { console.log(err) }
        })
    })
    console.log(res) */

    //return null

    /* return await dbmysql.getConnection().query(query, params, (err, rows) => {
        if(err) console.log(err)
        try {
            jsonRows = JSON.parse(JSON.stringify(rows))
        } catch(err) { console.log(err) }
    }) */
}
/* module.exports.findById = (idutente) => {
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
} */

module.exports.findByUsername = async (username) => {
    const query = 'SELECT * FROM emtutenti WHERE username=?'
    const params = [username]
    let jsonRows = null

    const res = await dbmysql.getPool().getConnection().then((conn) => {
        const data = conn.query(query, params)
        conn.release()
        return data
    }).then((result) => {
        var raw = result[0]
        const rows = JSON.parse(JSON.stringify(raw))
        return rows[0]
    })

    return res
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