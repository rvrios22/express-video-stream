const express = require('express');
const router = express.Router()
const db = require('../models');
const fs = require('fs');
const helpers = require('../helpers')
const multer = require('../multer')
const path = require('path')

const Video = db.models.Video
const Folder = db.models.Folder

router.get('/', async (req, res) => {
    try {
        const videos = await Video.findAll()
        res.status(200).json({ success: true, videos })
    } catch (err) {
        res.status(500).json({ success: false, err })
    }
})

router.get('/:videoName', (req, res) => {
    const videoName = req.params.videoName
    const videoPath = path.join(__dirname, '..', 'public', 'video', videoName)

    fs.stat(videoPath, (err, stat) => {
        if (err) {
            console.error(err)
            return res.status(404).send('Video file not found')
        }
    })

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send(`Requested range not satisfiable\n ${start} >= ${fileSize}`)
            return
        }

        const chucnkSize = (end - start) + 1
        const file = fs.createReadStream(videoPath, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chucnkSize,
            'Content-Type': 'video/mp4'
        }

        res.writeHead(206, head)
        file.pipe(res)

    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(200, head)
        fs.createReadStream(videoPath).pipe(res)
    }
})

router.post('/upload', multer.fields([{ name: 'video' }, { name: 'thumbnail' }]), async (req, res) => {
    const files = req.files
    const { description, title, folderName } = req.body
    const paths = helpers.getPaths(files)
    const modifedPaths = helpers.removePublicFromPath(paths)

    try {
        let folder = await Folder.findOne({ where: { name: folderName } })
        if (!folder) {
            folder = await Folder.create({ name: folderName })
        }

        const video = await Video.create({
            title: title,
            description: description,
            folderId: folder.id,
            videoPath: modifedPaths[0],
            thumbnailPath: modifedPaths[1]
        })
        res.json({ success: true, video })
    } catch (err) {
        res.json(err)
    }
})

module.exports = router