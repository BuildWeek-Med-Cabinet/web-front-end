const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('./auth/auth-router.js')
const strainRouter = require('./strains/strain-router')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/auth', authRouter)
server.use('/api/strains', strainRouter)

module.exports = server