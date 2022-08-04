const { Schema, model } = require('mongoose')
const attachment = require('../../config/schema/attachment')

const schema = new Schema({
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
        type: attachment
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

schema.pre('save', async (next) => {
    console.log('PRE SAVE HERE TESTING!')
    next()
})

module.exports = model('trainings', schema)