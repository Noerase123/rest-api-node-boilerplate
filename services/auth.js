const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errorHandler = require('./errorHandler')
const { listDataResponse, viewDataResponse } = require('../utils/dataResponse')

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await models['authentications'].find({ email })

      if (!user) {
        errorHandler(401, res, 'username not exist')
      } else if (user) {
        const encryptPass = await bcrypt.compareSync(password, user[0].password)

        if (!encryptPass) {
          errorHandler(401, res, 'incorrect email or password')
        } else {
          const private_key = process.env.SECRET
          const token = jwt.sign({ user: user[0] }, private_key, {
            expiresIn: '60h'
          })
          res.status(200).json({
            message: 'User Login successfully',
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
      const userRegister = await models['users'].create({
        ...info
      })
      if (userRegister) {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
        if (!hashedPassword) {
          errorHandler(500, res, 'error authenticating email/password')
        }
        const authRegister = await models['authentications'].create({
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
      const viewAll = await req.paginationProcess(models['users'].find())
      const rawList = await models['users'].find()
      const response = listDataResponse(viewAll, res, rawList)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  viewUser: async (req, res, next) => {
    try {
      const { _id } = req.params
      const view = await models['users'].findOne({ _id })
      const response = viewDataResponse(view, res)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json(error)
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
      const updatedRegistration = await models['users'].updateOne({ _id }, { $set: setInfos })
      if (updatedRegistration) {
        res.status(200).json({
          message: 'Updated a user successfully',
          updatedRegistration
        })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  },
  deleteUser: async (req, res, next) => {
    const { _id } = req.params
    try {
      const deleteUser = await models['users'].deleteOne({ _id })
      if (deleteUser) {
        res.status(200).json({
          message: 'Deleted a user successfully'
        })
      }
    } catch (error) {
      res.status(500).json(err)
    }
  }
}