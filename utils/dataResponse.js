const { setApiCache } = require('../middleware/cache')
const { range } = require('./helpers')

exports.listDataResponse = (model, res, rawList = []) => {
    const response = {
        count: model.length,
        result: model,
        pagination: null
    }
    if (res.pagination) {
        response['pagination'] = res.pagination
        response['pagination']['page'] = response['pagination']['page'] + 1
        if (rawList.length > 0) {
            response['pagination']['totalItems'] = rawList.length
            const isSeen = range(res.pagination.page === 1 ? res.pagination.page : ((res.pagination.page * res.pagination.limit) - res.pagination.limit + 1), res.pagination.page * res.pagination.limit)
            response['pagination']['scene'] = 
                `${res.pagination.page === 1 ? res.pagination.page : ((res.pagination.page * res.pagination.limit) - res.pagination.limit + 1)} - ${isSeen.includes(rawList.length) ? rawList.length : (res.pagination.page * res.pagination.limit)}`
        }
        const cacheKey = res.cacheKey
        setApiCache(cacheKey, response)
    } else {
        response['pagination'] = false
    }
    return response
}

exports.viewDataResponse = (model, res) => {
    const response = {
        entry: model
    }
    setApiCache(res.cacheKey, response)
    return response
}