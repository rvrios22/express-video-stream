const express = require('express');
const router = express.Router()
const db = require('../models');
const fs = require('fs');
const helpers = require('../helpers')
const multer = require('../multer')
const path = require('path')

const Video = db.models.Video
const Folder = db.models.Folder

router.get('/', async (req, res, next) => {
    try {
        const videos = await Video.findAll()
        res.status(200).json({ success: true, videos })
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {

        const videoId = req.params.id
        const video = await Video.findOne({
            where:
                { id: videoId }
        })

        const videoPath = path.join(__dirname, '..', 'public', video.videoPath)
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
            const chunkSize = 10 ** 6
            const parts = range.replace(/bytes=/, '').split('-')
            const start = parseInt(parts[0], 10);
            const end = Math.min(start + chunkSize, fileSize - 1);

            if (start >= fileSize) {
                res.status(416).send(`Requested range not satisfiable\n ${start} >= ${fileSize}`)
                return
            }

            const contentLength = (end - start) + 1
            const file = fs.createReadStream(videoPath, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': 'video/mp4',
                'Cache-Control': 'no-cache'
            }

            res.writeHead(206, head)
            file.pipe(res)

        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
                'Cache-Control': 'no-cache'

            }
            res.writeHead(200, head)
            fs.createReadStream(videoPath).pipe(res)
        }
    } catch (err) {
        next(err)
    }
})

router.post('/upload', multer.fields([{ name: 'video' }, { name: 'thumbnail' }]), async (req, res, next) => {
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
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const videoId = req.params.id
        const video = await Video.findOne({ where: { id: videoId } })
        video.destroy()
        res.status(200).json({ success: true, message: 'Video has been deleted' })

    } catch (err) {
        next(err)
    }
})

module.exports = router