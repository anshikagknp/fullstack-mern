const MESSAGES = require("../constants/messages");
const STATUS_CODES = require("../constants/statusCodes");
const UserModel = require("../models/userModel");
const { sendError, sendSuccess } = require("../utils/responseHelpers");

const uploadProfilePicController = async(req, res, next)=>{
    try{
        if(!req.file)
            return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.COMMON.UPLOAD_ERROR);

        const user = await UserModel.findById(req.user.id);
        if(!user)
            return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);

        user.profilePic = req.file.filename;
        await user.save();

        return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.UPDATED);
    }
    catch(err){
        next(err);
    }
};

module.exports = uploadProfilePicController;
