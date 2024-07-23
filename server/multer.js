const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'public/video'
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname} - ${Date.now()}`)
    }
})

const upload = multer({ storage: storage })

module.exports = upload