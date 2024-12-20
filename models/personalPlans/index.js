const { Schema, model } = require('mongoose')

const schema = new Schema({
    userID: {
        type: 'ObjectId',
        ref: 'users',
        required: true
    },
    trainingType: {
        type: [String],
        required: true
    },
    trainings: {
        type: ['ObjectId'],
        ref: 'trainings',
        required: true
    },
    dates: {
        type: [Date],
        required: true
    },
    time: {
        type: String,
        required: true,
        enum: ['Morning', 'Evening'],
        default: 'Morning'
    },
    planCreated: {
        type: Date
    },
    _status: {
        type: String,
        default: 'active'
    }
})

module.exports = model('personalPlans', schema)