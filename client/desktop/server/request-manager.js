'use strict'

const request = require('request-promise')
let defGet = { baseUrl: 'http://localhost:8443', method: 'get', json: true }
let defPost = { baseUrl: 'http://localhost:8443', method: 'post', json: true }


module.exports.setToken = (token) => {
    defGet = Object.assign(defGet, { headers: { 'x-access-token': token } })
    defPost = Object.assign(defPost, { headers: { 'x-access-token': token } })
}

/* module.exports.doGet = async (config) => {
    const reqConfig = Object.assign(defGet, config)
    return await request(reqConfig)
}

module.exports.doPost = async (config) => {
    const reqConfig = Object.assign(defPost, config)
    return await request(reqConfig)
} */


module.exports.doGet = (config) => {
    const reqConfig = Object.assign(defGet, config)
    return new Promise(async (resolve, reject) => {
        const response = await request(reqConfig)
        resolve(response.data)
    })
}

module.exports.doPost = (config) => {
    const reqConfig = Object.assign(defPost, config)
    return new Promise(async (resolve, reject) => {
        const response = await request(reqConfig)
        resolve(response.data)
    })

    /* return new Promise(async (resolve, reject) => {
        resolve(await request(reqConfig))
    }) */
    /*return new Promise(async (resolve, reject) => {
        request(reqConfig).then((response) => {
            resolve(response)
        }).catch((err) => {
            console.log(err)
            throw err
        })
    })*/
}





/*
'use strict'

const request = require('request-promise')
let defGet = { baseUrl: 'http://localhost:8443', method: 'get', json: true }
let defPost = { baseUrl: 'http://localhost:8443', method: 'post', json: true }


module.exports.setToken = (token) => {
    defGet = Object.assign(defGet, { headers: { 'x-access-token': token } })
    defPost = Object.assign(defPost, { headers: { 'x-access-token': token } })
}

module.exports.doGet = (config) => {
    const reqConfig = Object.assign(defGet, config)
    return request(reqConfig)
}

module.exports.doPost = (config) => {
    const reqConfig = Object.assign(defPost, config)
    return request(reqConfig)
}
*/