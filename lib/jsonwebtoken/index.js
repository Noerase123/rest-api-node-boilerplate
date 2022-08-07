const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        const token = jwt.sign({ user: payload }, process.env.SECRET, {
            expiresIn: '24h'
        })
        return token
    },
    verifyToken: (token, callback) => {
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            callback(err, decoded)
        })
    }
}