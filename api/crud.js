const { auth, pagination, cache } = require('../middleware')
const {
  create,
  viewAll,
  view,
  update,
  deleteOne,
  deleteAll
} = require('../services/crud')

module.exports = (router) => {
  router.route('/:_model')
    .post(auth, create)
    .get(auth, pagination, cache.getApiCache, viewAll)
    .delete(auth, deleteAll)

  router.route('/:_model/:_id')
    .patch(auth, update)
    .get(auth, cache.getApiCache, view)
    .delete(auth, deleteOne)
}