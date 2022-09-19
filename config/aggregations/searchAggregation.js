const generateSearch = (searchAttributes, search, options) => {
    const searchFields = searchAttributes.map((attr) => ({
        [attr]: {
            $regex: search,
            $options: 'i'
        }
    }))
    let objSearchFields = []
    try {
        objSearchFields = searchAttributes.map((attr) => ({
            [attr]: ObjectId(search)
        }))
    }
    catch (err) {
    //  
    }

    const aggregate = [
        {
            $match: {
                $or: [
                    ...searchFields,
                    ...objSearchFields
                ]
            }
        },
        ...options
    ]

    return [].concat(aggregate)

}

const generateSearchCount = (searchAttributes, search) => {
    const searchFields = searchAttributes.map((attr) => ({
        [attr]: {
            $regex: search,
            $options: 'i'
        }
    }))
    let objSearchFields = []
    try {
        objSearchFields = searchAttributes.map((attr) => ({
            [attr]: ObjectId(search)
        }))
    }
    catch (err) {
    //  
    }

    return [].concat([
        {
            $match: {
                $or: [
                    ...searchFields,
                    ...objSearchFields
                ]
            }
        },
        {
            $count: 'searchCount'
        }
    ])

}

module.exports = {
    generateSearch,
    generateSearchCount
}