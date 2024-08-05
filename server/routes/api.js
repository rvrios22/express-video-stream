const express = require('express');
const router = express.Router()
const db = require('../models')

const Video = db.models.Video

router.get('/video/:id', async (req, res, next) => {
    try {
        const videoId = req.params.id
        const video = await Video.findOne({ where: { id: videoId } })
        res.status(200).json({ success: true, video })
    } catch (err) {
        next(err)
    }
})

module.exports = router