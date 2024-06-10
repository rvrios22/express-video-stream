const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')
const PORT = 3001;


app.get('/download', (req, res) => {
    const videoPath = path.join(__dirname, 'video', 'nodeVideo.mp4')
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

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})