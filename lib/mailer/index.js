const nodemailer = require('nodemailer')
const { google } = require('googleapis')

module.exports = {
    sendMail: (name, email, subject, body, options) => {
        const CLIENT_EMAIL = process.env.CLIENT_EMAIL
        const CLIENT_ID = process.env.CLIENT_ID
        const CLIENT_SECRET = process.env.CLIENT_SECRET
        const REDIRECT_URI = process.env.REDIRECT_URI
        const REFRESH_TOKEN = process.env.REFRESH_TOKEN

        const OAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI,
        )
        OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
        try {
            // Generate the accessToken on the fly
            const accessToken = await OAuth2Client.getAccessToken()

            // Create the email envelope (transport)
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: CLIENT_EMAIL,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            // Create the email options and body 
            // ('email': user's email and 'name': is the e-book the user wants to receive)
            const mailOptions = {
                from: `FRONT <${CLIENT_EMAIL}>`,
                to: email,
                subject,
                html: body,
                ...options,
                attachments: [
                    {
                    filename: `${name}.pdf`,
                    path: path.join(__dirname, `e-books-path/${name}.pdf`),
                    contentType: 'application/pdf',
                    },
                ],
            };

            // Set up the email options and delivering it
            const result = await transport.sendMail(mailOptions);
            return result;

        } catch (error) {
            return error;
        }
    }
}