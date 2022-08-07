const errorHandler = require('./errorHandler')
const { listDataResponse, viewDataResponse } = require('../utils/dataResponse')
const crud = require('../lib/rest-crud')
const { crudEntry } = require('../utils/helpers')

const successResponse = (type, _model, payload) => ({
    message: `${crudEntry(type)} an entry for ${_model}`,
    payload
})

module.exports = {
    create: async (req, res, next) => {
        const { _model } = req.params
        try {
            const { ...info } = req.body
            const entry = await crud(_model).create(info)

            if (!entry) {
                throw new Error(`Error in creating ${_model}`)
            }
            res.status(201).json(successResponse(
                'create',
                _model,
                entry
            ))
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
            const all = await req.paginationProcess(crud(_model).viewAll(query))
            const count = await crud(_model).count(query)
            const response = listDataResponse(all, req, res, count)
            res.status(200).json(response)
        } catch (error) {
            errorHandler(500, res, error)
        }
    },
    view: async (req, res, next) => {
        const { _model, _id } = req.params
        try {
            const view = await crud(_model).viewOne(_id)
            const response = viewDataResponse(view, res)
            res.status(200).json(response)
        } catch (error) {
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
            const updatedResult = await crud(_model).update(_id, setInfos)
            res.status(200).json(successResponse(
                'update',
                _model,
                updatedResult
            ))
        } catch (error) {
            errorHandler(500, res, error)
        }
    },
    deleteOne: async (req, res, next) => {
        const { _model, _id } = req.params
        try {
            const deletedInfo = await crud(_model).delete(_id)
            res.status(200).json(successResponse(
                'delete',
                _model,
                deletedInfo
            ))
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
            const deleteAllInfos = await crud(_model).deleteAll(query)
            res.status(200).json({
                message: `Deleted all selected entries for ${_model}`,
                deleteAllInfos
            })
        } catch (error) {
            errorHandler(500, res, error)
        }
    }
}