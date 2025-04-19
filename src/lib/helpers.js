const errorResponse = (message, statusCode = 500, details = null) => {
    const response = {
        success: false,
        message,
        statusCode,
    };

    if (details) {
        response.details = details;
    }

    return response;
};

const successResponse = (message, data = {}, statusCode = 200) => {
    return {
        success: true,
        message,
        data,
        statusCode,
    };
};

class ApiError extends Error {
    constructor(message, statusCode, code = null, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends ApiError {
    constructor(message = "Bad Request", code = null, errors = null) {
        super(message, 400, code, errors);
    }
}

class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized", code = null) {
        super(message, 401, code);
    }
}

class ForbiddenError extends ApiError {
    constructor(message = "Forbidden", code = null) {
        super(message, 403, code);
    }
}

class NotFoundError extends ApiError {
    constructor(message = "Resource not found", code = null) {
        super(message, 404, code);
    }
}

class ValidationError extends ApiError {
    constructor(message = "Validation failed", errors = null) {
        super(message, 422, "validation_failed", errors);
    }
}

export { errorResponse, successResponse, ApiError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ValidationError };
