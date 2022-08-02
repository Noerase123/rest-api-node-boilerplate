const path = require('path')
const fs = require('fs')

const handleError = (err, res) => {
  res
    .status(500).json({
      error: err
    })
};

module.exports = {
  upload: async (req, res, next) => {
    const tempPath = req.file.path
    const targetPath = path.join(__dirname, `./public/images`)

    if (targetPath) {
      fs.rename(tempPath, targetPath, err => {
        // if (err) return handleError(err, res)

        res.status(200).json({
          message: 'File uploaded successfully!'
        })
      })
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res)

        res.status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      })
    }
  },
  getFile: async (req, res, next) => {
    const { _model, _fileName } = req.params
    try {
      res.sendFile(path.join(__dirname, `./images/${_model}/${_fileName}.png`))
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}