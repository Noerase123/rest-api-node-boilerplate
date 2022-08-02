module.exports = (status, res, error = '') => {
    const code = {
        401: {
            message: 'Unauthorized request. Login required',
            error,
            status: 0
        }, // login required
        400: {
            message: 'Token required',
            error,
            status: 0
        }, // Token Expired
        500: {
            message: 'Server error',
            error,
            status: 0
        }, // Server Issue
        422: {
            message: 'Validation failed',
            error,
            status: 0
        }, // Validation Failed
        403: {
            message: 'Forbidden request. Cannot access',
            error,
            status: 0
        }, // User Is Blocked
        404: {
            message: 'Not found',
            error,
            status: 0
        },
    };
    
    console.log(error)
    const responseStatus = code[status]

    res.status(status).json(responseStatus)
}