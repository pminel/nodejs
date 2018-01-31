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
}