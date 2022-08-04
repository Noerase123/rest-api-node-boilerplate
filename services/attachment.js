const path = require('path')
const fs = require('fs')
const models = require('../models')

const handleError = (err, res) => {
  res
    .status(500).json({
      error: err
    })
};

module.exports = {
  upload: async (req, res, next) => {
    const tempPath = req.file.path
    const { _model, _id } = req.params
    const { _field } = req.query
    const targetPath = path.join(__dirname, `./public/images`)

    const updateOps = {}
    const setInfos = Object.assign(updateOps, {
        [_field]: req.file
    })

    const updateResult = await models[`${_model}`].updateOne({ _id }, { $set: setInfos })

    if (targetPath && updateResult) {
      fs.rename(tempPath, targetPath, err => {
        // if (err) return handleError(err, res)

        res.status(201).json({
          message: 'File uploaded successfully!',
          updateResult,
          file: req.file
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
    const { _model, _id } = req.params
    const { _field } = req.query
    try {
      const view = await models[`${_model}`].findById(_id)
      res.sendFile(view[`${_field}`].path)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}