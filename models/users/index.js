const { Schema, model } = require('mongoose')

const user = new Schema({
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
    gender: {
        enum: [
            'Male',
            'Female'
        ],
        type: String,
        required: true,
        default: 'Male'
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    _status: {
        type: String,
        default: 'active'
    }
})

module.exports = model('users', user)