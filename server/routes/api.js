const express = require('express');
const router = express.Router()
const videoMetadata = require('../public/videoMetaData')


router.get('/video', (req, res) => {
    res.json(videoMetadata)
})

module.exports = router