const { auth } = require('../middleware')
const { upload, getFile } = require('../services/attachment')
const { uploadMultPath } = require('../lib/multer')

module.exports = (router) => {
    router.route('/document/:_model/:_id')
      .post(auth, uploadMultPath.single("file"), upload)
      .get(auth, getFile)
}