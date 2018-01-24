'use strict'

const request = require('request-promise')


module.exports.doPost = (config) => {
    const def = { baseUrl: 'http://localhost:8443', method: 'post', json: true }
    const reqConfig = Object.assign(def, config)
    return request(reqConfig)
}

module.exports.doGet = (config) => {
    const def = { baseUrl: 'http://localhost:8443', method: 'get', json: true }
    const reqConfig = Object.assign(def, config)
    return request(reqConfig)
}


/* let requestPost = request.defaults({
    baseUrl: 'http://localhost:8443',
    method: 'post',
    json: true
})
module.exports.execPost = (config) => {
    return requestPost(config)
}


let requestGet = request.defaults({
    baseUrl: 'http://localhost:8443',
    method: 'get',
    json: true
})
module.exports.execGet = (config) => {
    return requestGet(config)
}


module.exports.setToken = (token) => {
    requestPost.headers = { 'x-access-token': token }
    requestGet.headers = { 'x-access-token': token }
    console.log(requestPost)
    console.log(requestGet)
} */