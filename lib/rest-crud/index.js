const models = require('../../models')

module.exports = (_model) => ({
    create: (payload) => {
        return models[_model].create({ ...payload })
    },
    count: (query = {}) => {
        return models[_model].find(query).count()
    },
    viewAll: (query = {}) => {
        return models[_model].find(query)
    },
    viewOne: (_id) => {
        return models[_model].findOne({ _id })
    },
    update: (_id, payload) => {
        return models[_model].updateOne({ _id }, { $set: payload })
    },
    delete: (_id) => {
        return models[_model].deleteOne({ _id })
    },
    deleteAll: (query) => {
        return models[_model].deleteMany(query)
    }
})