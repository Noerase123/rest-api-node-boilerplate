const { Schema, model } = require('mongoose')

const schema = new Schema({
    userID: {
        type: 'ObjectId',
        required: true
    },
    trainingType: {
        type: String,
        required: true
    },
    training: {
        type: 'ObjectId',
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
    muscleType: {
        type: [String],
        required: true
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