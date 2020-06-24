const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Authenticate = require('./auth-model')
const authentication = require('../middleware/restricted-middleware')

const router = express.Router()

router.post('/register', async (req, res) => {
    let body = req.body
    const hash = bcrypt.hashSync(body.password, 8)
    body.password = hash
    try {
      const user = await Authenticate.add(body)
      if (user) {
        return res.status(201).json({ username: user.username, email:user.email})  
      }
      res.status(400).json({ message: 'Error registering user' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await Authenticate.findByEmail(email).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            const newToken = await Authenticate.addToken(user.id, token)
            if (newToken > 0) { 
                return res.status(200).json({ username: user.username, email: user.email, token })
            }
        }
        res.status(401).json({ message: 'please enter the correct credentials' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

router.post('/logout', authentication, async (req, res) => {
    const username = req.decodedJWT.username
    try {
        console.log(req.decodedJWT)
        const user = await Authenticate.removeToken(req.token)
        if (user > 0) { return res.status(200).json({ message: 'successfully logged out.' })}
        res.status(404).json({ message: 'user doesnt exist' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn: "24h"
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router