const authentications = require('../models/authentications')
const errorHandler = require('../services/errorHandler')
const { verifyToken } = require('../lib/jsonwebtoken')

module.exports = {
  authorizationGeneric: (req, res, next) => {
    try {
      let token = req.headers.authorization.split(' ')[1]
      if (token) {
        verifyToken(token, async (err, decoded) => {
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
  },
  accessRole: (role) => {
    return (req, res, next) => {
      try {
        let token = req.headers.authorization.split(' ')[1]
        if (token) {
          verifyToken(token, async (err, decoded) => {
            if (err) {
              errorHandler(400, res)
            } else {
              const user = await authentications.findById(decoded.user._id)
              if (user.userRole.includes(role)) {
                next()
              } else {
                errorHandler(403, res)
              }
            }
          })
        }
      } catch (error) {
        errorHandler(401, res)
      }
    }
  }
}