const express = require('express');
const app = express();
const videoRoutes = require('./routes/video')
const PORT = 3001;

app.use('/video', videoRoutes)

app.use((req, res, next) => {
    // if (!res.headersSent) {
        res.status(404).json({ error: 'Not found' })
    // }
})

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})