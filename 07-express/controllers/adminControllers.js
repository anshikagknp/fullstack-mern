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

// Hide Password
const sanitizeUser = (user)=>{
    user = user.toObject ? user.toObject() : {...user};
    delete user["userPwd"];
    return user;
}

// Add a user
const adminAddUser = async (req, res, next)=>{  // Fixed: added `next` parameter

    try{
        const { unm, pwd, mailId } = req.body ;

        if(!unm || !pwd || !mailId)
        return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.MISSING_VALUES);

        const hashedPwd = await bcrypt.hash(pwd, 10);

        let newUser = new UserModel({
            userName: unm,
            userPwd: hashedPwd,
            userEmail: mailId
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

// Show all users
const adminShowUsers = async(req, res, next)=>{
    try
    {
        // const allUsers = await UserModel.find({}, {userPwd:0});
        // const allUsers = await UserModel.find().select("userName userEmail");
        // const allUsers = await UserModel.find().select("-userPwd");
        const allUsers = await UserModel.find();
        // return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.FETCHED_ALL, sanitizeUser(allUsers));
        return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.FETCHED_ALL, allUsers.map(sanitizeUser));
    }
    catch(err)
    {
        next(err);
    }
}

// Find User by ID
const adminFindUser = async (req, res, next) => {
    try
    {
        const user = await UserModel.findById(req.params.id);
        if(!user)
            return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND)
        return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.FETCHED, sanitizeUser(user));
    }
    catch(error){       // Fixed: was calling `next(err)` but bound variable is `error`
        next(error);
    }
};

// Delete User By ID
const adminDeleteUser = async(req, res, next) => {
    try
    {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if(!user)
            return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND)
        return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.DELETED);
    }
    catch(err)
    {
        next(err);
    }
}

// Update User Details
const adminUpdateUser = async(req, res, next) => {
    try
    {
        const { mailId } = req.body ;
        if(!mailId)
        return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.MISSING_VALUES);
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                userEmail: mailId
            },
            {
                new: true,
                runValidators: true,
            }
        );
        if(!user)
            return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
        return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.UPDATED, sanitizeUser(user));
    }
    catch(err)
    {
        next(err);
    }
}

module.exports = {adminDefault, adminHome, adminAbout, adminGetUser, adminAddUser, adminShowUsers, adminFindUser, adminDeleteUser, adminUpdateUser}