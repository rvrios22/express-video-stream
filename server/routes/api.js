const express = require('express');
const path = require('path')
const fs = require('fs');
const router = express.Router()
const videoMetadata = require('../public/videoMetaData')

router.get('/', (req, res) => {
    res.send('hello')
})

router.get('/video', (req, res) => {
    res.json(videoMetadata)
})

module.exports = router