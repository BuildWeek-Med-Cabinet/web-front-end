const db = require('../data/dbconfig')

module.exports = {
    add,
    findByToken,
    removeToken,
    addToken,
    findByEmail
}

function add(user) {
    return db('users')
            .insert(user)
            .then(() => user)
}

function findByToken(token) {
    return db('users').where({token})
}

function addToken(id, token) {
    return db('users').where({id}).update({token})
}

function removeToken(token) {
    return db('users').where({token}).update({token: "" })
}

function findByEmail(email) {
    return db('users').where({email})
}
