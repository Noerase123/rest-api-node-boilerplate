const errorHandler = require('../services/errorHandler')
const { setCache, getCache } = require('../lib/redis')

exports.setApiCache = async (key, value) => {
    try {
        await setCache(key, JSON.stringify(value), {
            EX: 10
        }) 
    } catch (error) {
        console.log(error)
    }
}
  
exports.getApiCache = async (req, res, next) => {
    try {
        let key = req.route.path + '::' + req.originalUrl
        const val = await getCache(key)
        
        if (val === null) {
            next()
        } else {
            res.status(200).json({
                cache: true,
                version: 'v2',
                ...JSON.parse(val)
            })
        }
    } catch (error) {
        errorHandler(400, res, error)
    }
}