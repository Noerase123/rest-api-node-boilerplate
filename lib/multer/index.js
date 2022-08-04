const multer = require('multer')
const path = require('path')
// const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let dir = path.resolve(`./public/images`)
        cb(null, dir)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
}

module.exports = {
    uploadMultPath: multer({
        storage: storage,
        limits: {
          fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    })
}