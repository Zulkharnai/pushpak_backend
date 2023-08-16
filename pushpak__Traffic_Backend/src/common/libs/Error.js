const ResponseHandler = require('@common/libs/ResponseHandler');

class AppError extends Error {
    constructor({ code, statusCode, message, key, error = null }) {
        super();
        this.code = code ?? 'UNHANDLED_ERROR';
        this.status = statusCode ?? '200';
        this.message = message ?? 'The Error is not handled';
        this.originalError = error ? error.name : 'ERROR';
        this.key = key ?? 'KEY_UNDFINDED';
        this.stack = error ? error.stack : null;
    }

    handleError(req, res) {
        const { code, status, key, message } = this
        const errorResponse = {
            code,
            status,
            key,
            message,
        }
        ResponseHandler.error(req, res, errorResponse);
    }
}

module.exports = AppError;