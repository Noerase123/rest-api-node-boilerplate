const path = require('path')
const fs = require('fs')
const crud = require('../lib/rest-crud')
const errorHandler = require('./errorHandler')

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
    const updateResult = await crud(_model).updateDoc({
      trainingID: _id
    }, setInfos)

    if (targetPath && updateResult) {
      fs.rename(tempPath, targetPath, err => {
        // if (err) return errorHandler(500, res, err)

        res.status(201).json({
          message: 'File uploaded successfully!',
          updateResult,
          file: req.file
        })
      })
    } else {
      fs.unlink(tempPath, err => {
        if (err) return errorHandler(500, res, err)

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
      const view = await crud(_model).viewOne(_id)
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
      errorHandler(500, res, error)
    }
  },
  deleteFile: async (req, res, next) => {
    const { _model, _id } = req.params
    const { _field } = req.query
    try {
      const viewOne = await crud(_model).viewOne(_id)
      const { path } = viewOne[`${_field}`]
      fs.unlink(path, err => {
        if (err) return handleError(err, res)
      })
      const setInfos = Object.assign({}, {
          [_field]: {}
      })
      const updated = await crud(_model).update(_id, setInfos)
      res.status(200).json({
        message: `Deleted a document from ${_id} of ${_model}`,
        updated
      })
    } catch (error) {
      errorHandler(500, res, error)
    }
  }
}