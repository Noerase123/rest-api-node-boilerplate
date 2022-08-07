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
    const { _field, _format } = req.query
    try {
      const view = await models[`${_model}`].findById(_id)
      const { path, mimetype } = view[_field]
      const data = await fs.readFileSync(path)
      const base64String = `data:${mimetype};base64,${Buffer.from(data).toString('base64')}`
      if (_format === 'download') {
        res.download(path)
      } else if (_format === 'base64') {
        res.status(200).json({
            file: base64String
        })
      } else {
        res.sendFile(path)
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  deleteFile: async (req, res, next) => {
    const { _model, _id } = req.params
    const { _field } = req.query
    try {
      const viewOne = await models[`${_model}`].findById(_id)
      const { path } = viewOne[`${_field}`]
      fs.unlink(path, err => {
        if (err) return handleError(err, res)
      })
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