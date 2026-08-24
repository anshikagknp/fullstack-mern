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

const adminAddUser = async (req, res)=>{

    console.log(req.body);
    try{
        let newUser = new UserModel({
            userName: req.body.unm,
            userPwd: req.body.pwd,
            userEmail: req.body.emailId
        });
        newUser = await newUser.save();
        // console.log(newUser);
        res.status(200).json(newUser);
        }
    catch(err){
        next(err);
    }
};

module.exports = {adminDefault, adminHome, adminAbout, adminGetUser, adminAddUser}