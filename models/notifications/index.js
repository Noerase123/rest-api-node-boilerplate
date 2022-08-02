const { Schema, model } = require('mongoose')

const schema = new Schema({
    userID: {
        type: 'ObjectId',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    action: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    count: {
        type: Number
    },
    _status: {
        type: String,
        default: 'active'
    }
})

module.exports = model('personalPlans', schema)