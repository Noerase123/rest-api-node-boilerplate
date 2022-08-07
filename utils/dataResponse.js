const { setApiCache } = require('../middleware/cache')
const { range } = require('./helpers')

exports.listDataResponse = (model, req, res, count) => {
    const response = {
        count,
        results: model,
        pagination: null,
        links: {
            prev: null,
            next: null
        }
    }
    if (res.pagination) {
        response['pagination'] = res.pagination
        response['pagination']['page'] = response['pagination']['page'] + 1
        const isSeen = range(res.pagination.page === 1 ? res.pagination.page : ((res.pagination.page * res.pagination.limit) - res.pagination.limit + 1), res.pagination.page * res.pagination.limit)
        const startFrom = res.pagination.page === 1 ? res.pagination.page : ((res.pagination.page * res.pagination.limit) - res.pagination.limit + 1)
        const endTo = isSeen.includes(count) ? count : (res.pagination.page * res.pagination.limit)
        if (count > 0) {
            response['pagination']['totalItems'] = count
            response['pagination']['scene'] = `${startFrom} - ${endTo}`
        }
        const fullUrl = `${req.protocol}://${req.get('host')}${req._parsedUrl.pathname}`
        const nextPage = response.pagination.page + 1
        const prevPage = response.pagination.page - 1
        response.links.prev = prevPage <= 0 ? null : `${fullUrl}?page=${prevPage}`
        response.links.next = isSeen.includes(response.pagination.totalItems) ? null : `${fullUrl}?page=${nextPage}`
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