
module.exports = {
    fieldname: {
        type: String,
        required: [
            true,
            'Field name is required.' 
        ]
    },
    originalname: {
        type: String,
        required: [
            true,
            'Original name is required.' 
        ]
    },
    encoding: {
        type: String,
        required: [
            true,
            'Encoding is required.' 
        ]
    },
    mimetype: {
        type: String,
        required: [
            true,
            'Mime type is required.' 
        ]
    },
    destination: {
        type: String,
        required: [
            true,
            'Destination filepath is required.' 
        ]
    },
    filename: {
        type: String,
        required: [
            true,
            'File name is required.' 
        ]
    },
    path: {
        type: String,
        required: [
            true,
            'File path is required.' 
        ]
    },
    size: {
        type: Number,
        required: [
            true,
            'File size is required.' 
        ]
    }
}