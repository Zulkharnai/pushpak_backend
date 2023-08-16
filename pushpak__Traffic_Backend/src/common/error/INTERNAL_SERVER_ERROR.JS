const AppError = require("@common/libs/Error");

class INTERNAL_SERVER_ERROR extends AppError {
    constructor(error) {
        const code = 'INTERNAL_SERVER_ERROR';
        const statusCode = 500;
        const message = 'Internal Server error occurred';
        super({ code, statusCode, message });
    }
}

module.exports = INTERNAL_SERVER_ERROR;