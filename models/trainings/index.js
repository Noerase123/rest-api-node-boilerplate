const { Schema, model } = require('mongoose')
const attachment = require('../../config/schema/attachment')
const { generateSearch, generateSearchCount } = require('../../config/aggregations/searchAggregation')

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
        enum: [
            'Build Muscle',
            'Lose Weight',
            'Stamina'
        ],
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

const searchAttributes = [ 
    'trainingID',
    'name',
    'type',
    'descriptions'
]

schema.statics.search = {
    default: (search, req) => {
        const result = generateSearch(searchAttributes, search, [
            {
                $sort: {
                    [req.orderBy]: req.orderAsc
                }
            },
            {
                $skip: req.limit * req.page
            },
            {
                $limit: req.limit
            }
        ])
        return result
    },
    count: (search) => {
        return generateSearchCount(searchAttributes, search)
    }
}

module.exports = model('trainings', schema)