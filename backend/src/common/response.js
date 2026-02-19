export const successResponse = (res, data, message = 'Success', code = 200) => {
    return res.status(code).json({
        success: true,
        message,
        data,
    });
};
export const errorResponse = (res, message = 'Error', code = 500, errors = null) => {
    return res.status(code).json({
        success: false,
        message,
        errors,
    });
};
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const code = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return errorResponse(res, message, code, err.errors);
};
export class AppError extends Error {
    statusCode;
    errors;
    constructor(message, statusCode = 500, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=response.js.map