const express = require('express')
const router = express.Router()
const db = require('../models')

const Folder = db.models.Folder

router.get('/', async (req, res) => {
    try {
        const folders = await Folder.findAll()
        res.json({ success: true, folders })
    } catch (err) {
        res.status(500).json({ success: false, err })
    }
})

module.exports = router