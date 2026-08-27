require("dotenv").config();
const express = require('express');     // to import a module
const db = require('./db_conn');    // database connectivity import
const app = express()   // calling of an express function returns an app

app.use(express.json())

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Hide Password
const sanitizeUser = (user)=>{
    user = user.toObject ? user.toObject() : {...user};
    delete user["userPwd"];
    return user;
}

// ---------- Middleware 1 (Application level middleware) ----------
const middleware1 =(req, res, next) => {
    console.log("Middleware 1 Calling....");
    req.userData = {uid: 1001, unm: "Rahul"};
    next();   
}

// ----------- Middleware 2 (Application level middleware)  -----------
const middleware2 =(req, res, next) => {
    console.log("Middleware 2 Calling....");
    req.userData.unm = req.userData.unm.toUpperCase();
    // req.userData = {uid: 1001, unm: req.userData.unm.toUpperCase()};
    next();   
}

app.use(middleware1, middleware2);

const bcrypt = require('bcrypt');

// Login
app.post("/login", async(req, res, next) => {
    try
    {
        const { emailId, pwd } = req.body;
        if(!pwd || !emailId)
            return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.MISSING_VALUES);
        const user = await UserModel.findOne({userEmail : emailId});
        if(!user)
            return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
        const isMatched = await bcrypt.compare(pwd, user.userPwd);
        
        if(!isMatched)
            return sendError(res, STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);
        // JWT Token
        // HTTP Cookie
        return sendSuccess(res, STATUS_CODES.OK, MESSAGES.AUTH.LOGIN_SUCCESS, sanitizeUser(user));
    }
    catch(err)
    {
        next(err);
    }
})

const adminRoutes = require('./routes/adminRoutes');
// http://localhost:8000/admin
app.use("/admin", adminRoutes);

const userRoutes = require('./routes/userRoutes');
// http://localhost:8000/admin
app.use("/user", userRoutes);

// http://localhost:8000
// Handler function
app.get("/",(req, res)=>{
    console.log(req.userData);
    res.send("Hellowwww Mrs Monika")    //to send data in string format - res.send()
})

// http://localhost:8000/home
app.get("/home",(req, res)=>{
    res.send("<h1 align = 'center'>My home page</h1>")
})

app.post("/",(req, res)=>{
    res.send("Response from Post....")
})

app.put("/",(req, res, next)=>{
    const err = new Error("Something Went Wrong.....");
    return next(err);
    res.send("Response from Put....");
})

app.get("/emp", (req, res)=>{
    userData = { userName: "Sachin", userAge : 45, userProfession : "Cricket"};
    res.json(userData);     //to send data in object format - res.json()
})

// listens to the request on the server
app.listen(PORT, HOST, (error)=>{
    if(error)
        console.log("Error Occured : " + error);
    else
        console.log(`Server Running at http://${HOST}:${PORT}`);       
})      

// ------------ Error Handling Middleware (used at last)---------------
const errorHandler = require("./middlewares/errorMiddleware");
const UserModel = require("./models/userModel");
const { sendError, sendSuccess } = require("./utils/responseHelpers");
const STATUS_CODES = require("./constants/statusCodes");
const MESSAGES = require("./constants/messages");
app.use(errorHandler);