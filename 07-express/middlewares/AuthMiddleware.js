const MESSAGES = require("../constants/messages");
const STATUS_CODES = require("../constants/statusCodes");
const { sendError } = require("../utils/responseHelpers");
const JWT = require('jsonwebtoken');

function authenticate(req, res, next){

    try{
        const token = req.cookies.jwtToken;
        if(!token)
            return sendError(res, STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.UNAUTHORIZED);

        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        next(err);
    }
}

module.exports = authenticate;
