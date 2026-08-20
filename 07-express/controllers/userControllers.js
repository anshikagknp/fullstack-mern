const userDefault = (req, res)=>{
    res.send("<h1 align='center'>User Default Page</h1>");
}

const userHome = (req, res) => {
    res.send("<h1 align='center'>User Home Page</h1>");
}

const userAbout = (req, res)=>{
    res.send("<h1 align='center'>User About Page</h1>");
}

module.exports = {userDefault, userHome, userAbout}