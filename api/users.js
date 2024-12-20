var express = require('express')
var router = express.Router()
const {
  signUp,
  listUsers,
  viewUser,
  login,
  createSession,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword
} = require('../services/auth')
const {
  pagination,
  getApiCache,
  accessRole,
  authorizationGeneric
} = require('../middleware')
const {
  auth
} = require('../lib/firebase')

/* GET users listing. */
router.post('/signup', signUp)

router.post('/login', login)

router.post('/createSession', createSession)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword/:_id', resetPassword)

router.post('/sso/login', auth.signInGoogle)

router.get('/users', authorizationGeneric, pagination, getApiCache, listUsers)

router.get('/users/:_id', authorizationGeneric, getApiCache, viewUser)

router.patch('/update/:_id', authorizationGeneric, updateUser)

router.delete('/delete/:_id', authorizationGeneric, deleteUser)

module.exports = router
