const INTERNAL_SERVER_ERROR = require("../error/INTERNAL_SERVER_ERROR.JS");

class ResponseHandler extends INTERNAL_SERVER_ERROR {
    static success(req, res, data = [], message = 'Data fetch successfully') {
        const response = {
            success: true,
            message,
            data
        }
        return res.status(200).json(response);
    }

    static recordresponse(req, res, data = [], total_records, total_pages, next, prev, message = 'Data fetch successfully') {
        console.log(message);
        const response = {
            success: true,
            message,
            total_records,
            total_pages,
            next,
            prev,
            data,
        }

        return res.status(200).json(response).end();
    }

    static error(req, res, obj) {
        console.log(obj);
        const { code, status, key, message } = obj;
        const response = {
            success: false,
            error: {
                code: code,
                statusCode: status,
                key: key,
                message: message
            }
        }
        return res.status(status).json(response).end();
    }
}

module.exports = ResponseHandler;