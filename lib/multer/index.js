const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const { _model } = req.params
        let dir = `${__dirname}/public/images/${_model}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, path.join(__dirname, `/public/images/${_model}`));
    },
    filename: function(req, file, cb) {
        const { _fileName } = req.params
        cb(null, `${_fileName}.${file.originalname.split('.')[1]}`);
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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