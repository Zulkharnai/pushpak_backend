const AppError = require("@common/libs/Error");

class PAGE_NOT_FOUND_ERROR extends AppError {
    constructor() {
        const code = 'PAGE_NOT_FOUND_ERROR';
        const statusCode = 404;
        const message = 'page not found';
        super({ code, statusCode, message });
    }
}

module.exports = PAGE_NOT_FOUND_ERROR;