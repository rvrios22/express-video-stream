const express = require('express');
const router = express.Router()
const path = require('path')
const fs = require('fs');
const videoMetadata = require('../public/videoMetaData')
const multer = require('../multer')

router.get('/folders', (req, res) => {
    res.json({ message: 'helo' })
})

router.get('/video', (req, res) => {
    res.json(videoMetadata)
})

router.post('/video/upload', multer.single('video'), (req, res) => {
    const file = req.file
    const { description, title } = req.body
    // if(!file) {
    //     res.status(400).send('No file uplaoded')
    // }

    console.log('body', req.body)
    console.log('file', file)

    // const newVideo = {
    //     id: videoMetadata.length + 1,
    //     location: `video/${file.filename}`,
    //     title: title,
    //     description: description,
    //     thumbnail: null
    // }

    // videoMetadata.push(newVideo)
    // res.status(201).json(newVideo)
})

module.exports = router