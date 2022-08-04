const admin = require('firebase-admin')
const gcm = require('node-gcm')
const cloudMessaging = require('./cloudMessaging')
const auth = require('./auth')

const serviceAccount = require('./fitrain-bad0d-firebase-adminsdk-rjiam-6d3aad867b.json')
const dbUrl = ''
const sender = new gcm.Sender(process.env.SENDER)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: dbUrl
})

const init = () => admin

module.exports = {
    cloudMessaging: cloudMessaging(init(), sender),
    auth: auth(init())
}