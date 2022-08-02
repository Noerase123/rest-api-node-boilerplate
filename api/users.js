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
const { auth, pagination, cache } = require('../middleware')

/* GET users listing. */
router.post('/signup', signUp)

router.post('/login', login)

router.get('/users', auth, pagination, cache.getApiCache, listUsers)

router.get('/users/:_id', auth, cache.getApiCache, viewUser)

router.patch('/update/:_id', auth, updateUser)

router.delete('/delete/:_id', auth, deleteUser)

module.exports = router
