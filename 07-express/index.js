require("dotenv").config();
const express = require('express');     // to import a module
const db = require('./db_conn');    // database connectivity import
const app = express()   // calling of an express function returns an app

app.use(express.json())

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8000;

const adminRoutes = require('./routes/adminRoutes');
// http://localhost:8000/admin
app.use("/admin", adminRoutes);

const userRoutes = require('./routes/userRoutes');
// http://localhost:8000/admin
app.use("/user", userRoutes);

// http://localhost:8000
// Handler function
app.get("/",(req, res)=>{
    res.send("Hellowwww Mrs Monika")    //to send data in string format - res.send()
})

// http://localhost:8000/home
app.get("/home",(req, res)=>{
    res.send("<h1 align = 'center'>My home page</h1>")
})

app.post("/",(req, res)=>{
    res.send("Response from Post....")
})

app.put("/",(req, res)=>{
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

