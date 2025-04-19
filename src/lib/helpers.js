const errorResponse = (message, statusCode = 500) => {
    return {
        success: false,
        message,
        statusCode,
    };
};

const successResponse = (message, data = {}, statusCode = 200) => {
    return {
        success: true,
        message,
        data,
        statusCode,
    };
};

export { errorResponse, successResponse };
