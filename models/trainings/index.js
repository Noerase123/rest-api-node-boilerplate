const { Schema, model } = require('mongoose')

const trainings = new Schema({
    trainingID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    muscleFocus: {
        type: [String],
        required: true
    },
    image: {
        type: String
    },
    descriptions: {
        type: String,
        required: true
    },
    benefits: {
        type: [String]
    },
    _status: {
        type: String,
        default: 'active'
    }
})

module.exports = model('trainings', trainings)