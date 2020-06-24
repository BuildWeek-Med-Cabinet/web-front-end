const express = require('express')

const Stains = require('./strain-model')
const authentication = require('../middleware/restricted-middleware')


const router = express.Router()

router.get('/', authentication, async (req, res) => {
    const {id} = req.decodedJWT
    try {
        const results = await Stains.getPreferrences(id)
        if (results) { return res.status(200).json(results)}
        res.status(404).json({ message: '0 results' })
    } catch(e) {
        res.status(500).json({ message: 'There was an a request error' })
    }
})

router.post('/', authentication, async (req, res) => {
    const body = req.body
    const user = req.decodedJWT
    try {
        const newStrain = await Stains.find(body.strain).first()
        if (newStrain) {
            const newPref = await Stains.checkIfInPreferrences(newStrain.id)
            if (newPref) {
                return res.status(400).json({ message: 'User already added new strain!' })
            }
            const results = await Stains.addPreferrences(user.id, newStrain.id)
            if (results) { 
                return res.status(200).json({ message: 'successfully added new strain!'})
            }
        } else {
            const cannabis_id = await Stains.add(body)
            const results = await Stains.addPreferrences(user.id, cannabis_id[0])
            if (results) {
                return res.status(200).json({ message: 'successfully added new strain!'})}
            }
        res.status(400).json({ message: 'Error adding strain' })
    } catch(e) {
        res.status(500).json({ message: 'There was a request error' })
    }
})

router.delete('/:id', authentication, async (req, res) => {
    const cannabis_id = req.params.id
    const user_id = req.decodedJWT.id
    try {
        const remove = await Stains.remove(cannabis_id, user_id)
        if (remove > 0) { return res.status(200).json({ message: 'Strain has been removed successfully' })}
        res.status(404).json({ message: 'Strain not found' })
    } catch(e) {
        res.status(500).json({ message: 'There was a request error' })
    }
})

module.exports = router