const { setApiCache } = require('../middleware')
const { range } = require('./helpers')

exports.listDataResponse = ({ model, req, res, count }) => {
    let response = {
        count,
        results: model,
        pagination: null,
        meta: {
            search: '',
            orderBy: '',
            orderAsc: 1
        },
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
            response['pagination']['paginate'] = Math.ceil(response['pagination']['totalItems'] / response['pagination']['limit'])
        }
        if (req.query.search) response['meta']['search'] = req.query.search
        if (req.query.orderBy) response['meta']['orderBy'] = req.query.orderBy
        if (req.query.orderAsc) response['meta']['orderAsc'] = req.query.orderAsc
        const fullUrl = `${req.protocol}://${req.get('host')}${req._parsedUrl.pathname}`
        const nextPage = response.pagination.page + 1
        const prevPage = response.pagination.page - 1
        response.links.prev = prevPage <= 0 ? null : `${fullUrl}?page=${prevPage}`
        response.links.next = isSeen.includes(response.pagination.totalItems) ? null : `${fullUrl}?page=${nextPage}`
        const cacheKey = res.cacheKey
        setApiCache(cacheKey, response)
    } else {
        delete response['pagination']
        delete response['links']
    }
    return response
}

exports.viewDataResponse = (model, res) => {
    const response = {
        entry: model
    }
    return response
}