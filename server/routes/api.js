const express = require('express');
const router = express.Router()
const path = require('path')
const fs = require('fs');
const videoMetadata = require('../public/videoMetaData')
const multer = require('../multer')


router.get('/video', (req, res) => {
    res.json(videoMetadata)
})

module.exports = router