const express = require('express');
const app = express();
const videoRoutes = require('./routes/video')
const PORT = 3001;

//log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
})

//log response headers
app.use((req, res, next) => {
    const defaultWriteHead = res.writeHead
    res.writeHead = function (statusCode, headers) {
        console.log(`Setting headers for ${req.method} ${req.url}`)
        console.log(`Status: ${statusCode}`)
        console.log(`Headers: ${headers}`)
        defaultWriteHead.apply(res, arguments)
    }
    next()
})

//log after response is sent
app.use((req, res, next) => {
    const defaultEnd = res.end
    res.end = function (chunk, encoding) {
        console.log(`Response sent for ${req.method} ${req.url}`)
        defaultEnd.apply(res, arguments)
    }
    next()
})

app.use('/video', videoRoutes)

app.use((req, res, next) => {
    // if (!res.headersSent) {
    res.status(404).json({ error: 'Not found' })
    // }
})

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})