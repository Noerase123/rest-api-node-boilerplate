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
  authorizationGeneric,
  accessRole
} = require('../middleware')

/* GET users listing. */
router.post('/signup', signUp)

router.post('/login', login)

router.get('/users', accessRole('Admin'), pagination, getApiCache, listUsers)

router.get('/users/:_id', accessRole('Admin'), getApiCache, viewUser)

router.patch('/update/:_id', accessRole('Admin'), updateUser)

router.delete('/delete/:_id', accessRole('Admin'), deleteUser)

module.exports = router
