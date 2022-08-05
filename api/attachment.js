const { auth } = require('../middleware')
const { uploadMultPath } = require('../lib/multer')
const {
  upload,
  getFile,
  deleteFile
} = require('../services/attachment')

module.exports = (router) => {
    router.route('/document/:_model/:_id')
      .post(auth, uploadMultPath.single("file"), upload)
      .get(getFile)
      .delete(auth, deleteFile)
}