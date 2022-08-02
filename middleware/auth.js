const jwt = require('jsonwebtoken')
const authentications = require('../models/authentications')
const errorHandler = require('../services/errorHandler')

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1]
    if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
          errorHandler(400, res)
        } else {
          const isUserExist = await authentications.findById(decoded.user._id)
          if (isUserExist) {
            next()
          } else {
            errorHandler(401, res)
          }
        }
      })
    }
  } catch (error) {
      errorHandler(400, res)
  }
}