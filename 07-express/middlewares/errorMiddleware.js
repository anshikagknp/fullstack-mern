const { sendError } = require("../utils/responseHelpers");

const errorHandler = (err, req, res, next) => {
    return sendError(res, err.statusCode, err.message, err.stack)   
};

module.exports = errorHandler;