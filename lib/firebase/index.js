const admin = require('firebase-admin')
const gcm = require('node-gcm')

const serviceAccount = ''
const dbUrl = ''
const sender = new gcm.Sender('SERVER_KEY_FROM_FCM')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: dbUrl
})

const notif_options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
}

module.exports = {
    sendMessageToOne: async (registeredToken, message) => {
        try {
            await admin.messaging().sendToDevice(registeredToken, message, notif_options)
        } catch (error) {
            console.log(error)
        }
    },
    sendMessageToMany: async (tokens, msg) => {
        const registrationTokens = []
        registrationTokens.push(tokens)

        const message = new gcm.Message({
            data: {
                ...msg
            }
        })

        const response = await sender.send(message, { registrationTokens })
        console.log(response)
    }
}