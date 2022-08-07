var express = require('express')
var router = express.Router()
const {
  signUp,
  listUsers,
  viewUser,
  login,
  updateUser,
  deleteUser
} = require('../services/auth')
const {
  pagination,
  getApiCache,
  authorizationGeneric
} = require('../middleware')

/* GET users listing. */
router.post('/signup', signUp)

router.post('/login', login)

router.get('/users', authorizationGeneric, pagination, getApiCache, listUsers)

router.get('/users/:_id', authorizationGeneric, getApiCache, viewUser)

router.patch('/update/:_id', authorizationGeneric, updateUser)

router.delete('/delete/:_id', authorizationGeneric, deleteUser)

module.exports = router
