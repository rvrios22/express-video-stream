const express = require('express')
const router = express.Router()
const db = require('../models')

const Folder = db.models.Folder

router.get('/', async (req, res, next) => {
    try {
        const folders = await Folder.findAll()
        res.json({ success: true, folders })
    } catch (err) {
        next(err)
    }
})

module.exports = router