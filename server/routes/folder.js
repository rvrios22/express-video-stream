const express = require('express')
const router = express.Router()
const db = require('../models')

const Folder = db.models.Folder

router.get('/', async (req, res) => {
    const { folderName } = req.body
    const folder = await Folder.findOne({ where: { name: folderName }})
    res.json({ folder })
})

module.exports = router