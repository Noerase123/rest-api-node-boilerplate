const models = require('../models')
const errorHandler = require('./errorHandler')
const { listDataResponse, viewDataResponse } = require('../utils/dataResponse')

module.exports = {
    create: async (req, res, next) => {
        const { _model } = req.params
        try {
            const { ...info } = req.body
            const model = models[`${_model}`]
            const entry = await model.create({ ...info })

            if (!entry) {
                throw new Error(`Error in creating ${_model}`)
            }
            res.status(201).json({
                message: `Created an entry for ${_model}`,
                entry
            })
        } catch (error) {
            errorHandler(500, res, error)
        }
    },
    viewAll: async (req, res, next) => {
        const { _model } = req.params
        const { field, search } = req.query
        try {
            let query = {}
            if (field && search) {
                query[field] = search
            }
            const all = await req.paginationProcess(models[`${_model}`].find(query))
            const rawList = await (models[`${_model}`].find(query))
            const response = listDataResponse(all, res, rawList)
            res.status(200).json(response)
        } catch (error) {
            errorHandler(500, res, error)
        }
    },
    view: async (req, res, next) => {
        const { _model, _id } = req.params
        try {
            const view = await models[`${_model}`].findOne({ _id })
            const response = viewDataResponse(view, res)
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            errorHandler(500, res, error)
        }
    },
    update: async (req, res, next) => {
        const { _model, _id } = req.params
        const updateOps = {}
        try {
            const { ...updateInfo } = req.body
            const setInfos = Object.assign(updateOps, {
                ...updateInfo
            })
            const updatedResult = await models[`${_model}`].update({ _id }, { $set: setInfos })
            res.status(200).json({
                message: `Updated an entry for ${_model}`,
                updatedResult
            })
        } catch (error) {
            errorHandler(500, res, error)
        }
    },
    deleteOne: async (req, res, next) => {
        const { _model, _id } = req.params
        try {
            const deletedInfo = await models[`${_model}`].deleteOne({ _id })
            res.status(200).json({
                message: `Deleted an entry for ${_model}`,
                deletedInfo
            })
        } catch (error) {
            errorHandler(500, res, error)
        }
    },
    deleteAll: async (req, res, next) => {
        const { _model } = req.params
        const { field, search } = req.query
        try {
            let query = {}
            if (field && search) {
                query[field] = search
            }
            const deleteAllInfos = await models[`${_model}`].deleteMany(query)
            res.status(200).json({
                message: `Deleted all selected entries for ${_model}`,
                deleteAllInfos
            })
        } catch (error) {
            errorHandler(500, res, error)
        }
    }
}