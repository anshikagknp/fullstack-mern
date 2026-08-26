const adminDefault = (req, res)=>{
    res.send("<h1 align='center'>Admin Default Page</h1>");
}

const adminHome = (req, res) => {
    res.send("<h1 align='center'>Admin Home Page</h1>");
}

const adminAbout = (req, res) => {
    res.send("<h1 align='center'>Admin About Us</h1>");
}

const adminGetUser = (req, res)=>{
    res.status(200).json({
        success : true,
        message : "User Found..",
        data : {
            unm: "Anshika", uid: "25MCA034"
        }
    });
};


const UserModel = require("../models/userModel");

const { sendError, sendSuccess } = require("../utils/responseHelpers");
const STATUS_CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/messages");

const bcrypt = require('bcrypt');

const adminAddUser = async (req, res)=>{

    try{
        const { unm, pwd, emailId } = req.body ;

        const hashedPwd = await bcrypt.hash(pwd, 10);

        if(!unm || !pwd || !emailId)
        return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.MISSING_VALUES);

        let newUser = new UserModel({
            userName: unm,
            userPwd: hashedPwd,
            userEmail: emailId
        });
        newUser = await newUser.save();
        return sendSuccess(res, STATUS_CODES.CREATED, MESSAGES.USER.CREATED, newUser);
        // console.log(newUser);
        // res.status(200).json(newUser);
        }
    catch(err){
        next(err);
    }
};

const adminShowUsers = async(req, res, next)=>{
    try
    {
        const allUsers = await UserModel.find();
        return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.FETCHED_ALL, allUsers);
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {adminDefault, adminHome, adminAbout, adminGetUser, adminAddUser, adminShowUsers}