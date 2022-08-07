const { authorizationGeneric, baseRole } = require('./auth')
const pagination = require('./pagination')
const { getApiCache, setApiCache } = require('./cache')

module.exports = {
    authorizationGeneric,
    baseRole,
    getApiCache,
    setApiCache,
    pagination
}