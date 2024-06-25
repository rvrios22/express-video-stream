const express = require('express');
const path = require('path')
const fs = require('fs');
const router = express.Router()
const videoMetadata = require('../public/videoMetaData')
const multer = require('../multer')

router.get('/', (req, res) => {
    res.send('hello')
    console.log(multer)
})
//TODO: MULTER MIDDLEWARE ADDED, FINISHED ROUTE
router.get('/video', multer.single('video'), (req, res) => {
    res.json(videoMetadata)
})

router.post('/video/upload', (req, res) => {

})

module.exports = router