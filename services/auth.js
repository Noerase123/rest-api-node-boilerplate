const bcrypt = require('bcrypt')
const errorHandler = require('./errorHandler')
const { listDataResponse, viewDataResponse } = require('../utils/dataResponse')
const { createToken } = require('../lib/jsonwebtoken')
const crud = require('../lib/rest-crud')

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await crud('authentications').viewAll({ email })

      if (!user) {
        errorHandler(401, res, 'username not exist')
      } else if (user) {
        const encryptPass = await bcrypt.compareSync(password, user[0].password)

        if (!encryptPass) {
          errorHandler(401, res, 'incorrect email or password')
        } else {
          const token = createToken(user[0])
          res.status(200).json({
            message: 'User Login successfully',
            status: 1,
            token
          })
        }
      }

    } catch (error) {
      errorHandler(500, res, error)
    }
  },
  signUp: async (req, res, next) => {
    try {
      const { ...info } = req.body
      const userRegister = await crud('users').create(info)
      if (userRegister) {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
        if (!hashedPassword) {
          errorHandler(500, res, 'error authenticating email/password')
        }
        const authRegister = await crud('authentications').create({
          ...info,
          password: hashedPassword
        })
        if (authRegister) {
          res.status(201).json({
            message: 'Created a user successfully',
            userRegister
          })
        } else {
          errorHandler(500, res, 'error creating authentications. please try again')
        }
      } else {
        errorHandler(500, res, 'error creating user. please try again')
      }
    } catch (error) {
      errorHandler(500, res, error)
    }
  },
  listUsers: async (req, res, next) => {
    try {
      const viewAll = await req.paginationProcess(crud('users').viewAll())
      const count = await crud('users').count()
      const response = listDataResponse(viewAll, req, res, count)
      res.status(200).json(response)
    } catch (error) {
      errorHandler(500, res, error)
    }
  },
  viewUser: async (req, res, next) => {
    try {
      const { _id } = req.params
      const view = await crud('users').viewOne(_id)
      const response = viewDataResponse(view, res)
      res.status(200).json(response)
    } catch (error) {
      errorHandler(500, res, error)
    }
  },
  updateUser: async (req, res, next) => {
    const { _id } = req.params
    try {
      const updateOps = {}
      const { ...updateInfo } = req.body
      const setInfos = Object.assign(updateOps, {
        ...updateInfo
      })
      const updatedRegistration = await crud('users').update(_id, setInfos)
      if (updatedRegistration) {
        res.status(200).json({
          message: 'Updated a user successfully',
          updatedRegistration
        })
      }
    } catch (error) {
      errorHandler(500, res, error)
    }
  },
  deleteUser: async (req, res, next) => {
    const { _id } = req.params
    try {
      const deleteUser = await crud('users').delete(_id)
      if (deleteUser) {
        res.status(200).json({
          message: 'Deleted a user successfully'
        })
      }
    } catch (error) {
      errorHandler(500, res, error)
    }
  }
}