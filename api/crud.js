const {
  pagination,
  authorizationGeneric,
  getApiCache
} = require('../middleware')
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
    .post(authorizationGeneric, create)
    .get(authorizationGeneric, pagination, getApiCache, viewAll)
    .delete(authorizationGeneric, deleteAll)

  router.route('/:_model/:_id')
    .patch(authorizationGeneric, update)
    .get(authorizationGeneric, getApiCache, view)
    .delete(authorizationGeneric, deleteOne)
}