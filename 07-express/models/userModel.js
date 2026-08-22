const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName: {type:String, required:true},
    userPwd: {type:String, required:true},
    userEmail: {type:String, required:true, unique:true},
    isActive: {type:Boolean, required:true, default:true},
    createdAt: {type:Date, required:true, default:Date.now},
    role: {type:String, enum:["admin","user"], required:true, default:"user"}
})

const UserModel = mongoose.model("AppUsers", userSchema)

module.exports = UserModel;