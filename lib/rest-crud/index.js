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
    findAndUpdate: (query, payload) => {
        return models[_model].updateOne(query, { $set: payload })
    },
    updateDoc: (query, payload) => {
        return models[_model].updateOne(query, { $set: payload })
    },
    delete: (_id) => {
        return models[_model].deleteOne({ _id })
    },
    deleteAll: (query) => {
        return models[_model].deleteMany(query)
    },
    rawQuery: (search, req) => {
        const modelSearch = models[_model].search.default
        const searchAggregate = modelSearch(search, req.pagination)
        const data = models[_model].aggregate(searchAggregate)
        return data
    },
    rawQueryCount: (search) => {
        const modelSearchCount = models[_model].search.count
        const searchAggregateCount = modelSearchCount(search, '')
        const count = models[_model].aggregate(searchAggregateCount)
        return count
    },
    rawCrud: () => {
        return models[_model]
    }
})