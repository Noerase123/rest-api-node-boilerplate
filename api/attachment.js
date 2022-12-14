const { authorizationGeneric } = require('../middleware')
const { uploadMultPath } = require('../lib/multer')
const {
  upload,
  getFile,
  deleteFile
} = require('../services/attachment')

module.exports = (router) => {
    router.route('/document/:_model/:_id')
      .post(authorizationGeneric, uploadMultPath.single("file"), upload)
      .get(getFile)
      .delete(authorizationGeneric, deleteFile)
}