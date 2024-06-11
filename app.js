const express = require('express');
const app = express();
const videoRoutes = require('./routes/video')
const PORT = 3001;

app.use('/video', videoRoutes)


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})