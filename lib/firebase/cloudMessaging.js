module.exports = (init, sender) => ({
    sendMessageToOne: async (registeredToken, message) => {
        try {
            const response = await init().messaging()
                .sendToDevice(
                    registeredToken,
                    message,
                    {
                        priority: 'high',
                        timeToLive: 60 * 60 * 24
                    })
            console.log(response)
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
})