const { Server } = require('socket.io')
const { createServer } = require('https')
// const fs = require('fs')

let io

const connect = (app) => {
    // const key = fs.readFileSync('./ssl/certificate.key')
    // const cert = fs.readFileSync('./ssl/certificate.crt')
    const server = createServer(app)
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    })
}

const subscribe_event = 'subscribe_event'

module.exports = {
    initSocket: (app, port) => {
        connect(app)
        io.on('connection', async (socket) => {
            console.log('socket connection established', socket.id)
            socket.join(subscribe_event)
        })
        io.listen(port)
    },
    setUserMsg: (payload) => {
        io.to(payload.userID).emit('user-msg', payload)
    },
    setAdminMsg: (payload) => {
        io.to(payload.userID).to(subscribe_event).emit('admin-msg', payload)
    },
    getUserMsg: (socket) => {
        let response
        socket.on('user-msg', data => {
            response = data
        })
        return response
    },
    getAdminMsg: (socket) => {
        let response
        socket.on('admin-msg', data => {
            response = data
        })
        return response
    }
}