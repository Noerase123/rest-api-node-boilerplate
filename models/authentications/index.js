const { Schema, model } = require('mongoose')

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(email) {
              const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
              return emailRegex.test(email);
            },
            message: '{VALUE} is not a valid email!',
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password need to be longer!'],
        validate: {
          validator(password) {
            return password.length >= 6 && password.match(/\d+/g);
          }
        }
    },
    userID: {
        type: 'ObjectId',
        required: true
    },
    userRole: {
        type: [String],
        require: true
    },
    lastLoggedIn: {
        type: Date
    },
    _status: {
        type: String,
        default: 'active'
    }
})

module.exports = model('authentications', schema)