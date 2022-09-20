const { Schema, model } = require('mongoose')
const { generateSearch, generateSearchCount } = require('../../config/aggregations/searchAggregation')

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

const searchAttributes = [ 
    'firstName',
    'lastName',
    'gender',
    'userType'
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

module.exports = model('users', schema)