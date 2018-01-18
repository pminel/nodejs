'use strict'

module.exports = function() {
    let mydb

    let init = (db) => {
        mydb = db
    }

    let getAll = () => {
        const query = 'SELECT * FROM emtutenti'

        return new Promise((resolve, reject) => {
            mydb.get().query(query, (err, rows) => {
                if(err) return reject(err)
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            })
        })
    }

    let findById = (id) => {
        const query = 'SELECT * FROM emtutenti WHERE idutente=?'
        const params = [id]

        return new Promise((resolve, reject) => {
            mydb.get().query(query, params, (err, rows) => {
                if(err) return reject(err)
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            })
        })
    }

    let findByUsername = (username) => {
        const query = 'SELECT * FROM emtutenti WHERE username=?'
        const params = [username]

        return new Promise((resolve, reject) => {
            mydb.get().query(query, params, (err, rows) => {
                if(err) return reject(err)
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            })
        })
    }

    let getLastPassword = (idutente) => {
        const query = 'SELECT * FROM emtpassword WHERE idutente=? AND datamodifica=(SELECT MAX(datamodifica) FROM emtpassword WHERE idutente=?)'
        const params = [idutente, idutente]

        return new Promise((resolve, reject) => {
            mydb.get().query(query, params, (err, rows) => {
                if(err) return reject(err)
                const jsonRows = JSON.parse(JSON.stringify(rows))
                resolve(jsonRows)
            })
        })
    }

    return {
        init: init,
        getAll: getAll,
        findById: findById,
        findByUsername: findByUsername,
        getLastPassword: getLastPassword
    }
}