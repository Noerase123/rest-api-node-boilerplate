const redis = require('redis')

const client = redis.createClient({
    port: 50986,
    host: '127.0.0.1'
})

module.exports = {
    setCache: async (key, value, options) => {
        await client.connect()
        await client.set(key, value, options)
        await client.disconnect()
    },
    getCache: async (key) => {
        await client.connect()
        const value = await client.get(key)
        await client.disconnect()
        return value
    }
}