const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = 'public/video'
        if(file.mimetype.startsWith('image/')) {
            uploadPath = 'public/thumbnails'
        }
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

module.exports = upload