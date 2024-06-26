const express = require('express');
const app = express();
const cors = require('cors')
const apiRoutes = require('./routes/api')
const videoRoutes = require('./routes/video')
const PORT = 3001;

app.use(cors())
app.use(express.json())

app.use('/video', videoRoutes)
app.use('/api', apiRoutes)

//serve static files out of public directory
app.use(express.static('public'))

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


app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})