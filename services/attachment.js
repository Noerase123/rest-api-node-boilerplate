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

    const setInfos = Object.assign({}, {
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
    const { _field, _download } = req.query
    try {
      const view = await models[`${_model}`].findById(_id)
      const path = view[`${_field}`].path
      if (Boolean(_download)) {
        res.download(path)
      }
      res.sendFile(path)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  deleteFile: async (req, res, next) => {
    const { _model, _id } = req.params
    const { _field } = req.query
    try {
      const setInfos = Object.assign({}, {
          [_field]: {}
      })
      const updated = await models[`${_model}`].updateOne({ _id }, { $set: setInfos })
      res.status(200).json({
        message: `Deleted a document from ${_id} of ${_model}`,
        updated
      })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}