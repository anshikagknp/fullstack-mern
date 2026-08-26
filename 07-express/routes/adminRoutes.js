const express = require('express');
const router = express.Router();
const { adminDefault, adminHome, adminAbout, adminGetUser, adminAddUser, adminShowUsers } = require("../controllers/adminControllers");

// -------------- Middleware 3 (Route level middleware) -------------
const middleware3 = (req, res, next) => {
    console.log("Admin Route Middleware......");
    next();
}
router.use(middleware3);

// http://localhost:8000/admin/
router.get("/", adminDefault);

// http://localhost:8000/admin/home
router.get("/home", adminHome);

// http://localhost:8000/admin/about
router.get("/about", adminAbout);

// http://localhost:8000/admin/user
router.get("/user", adminGetUser);

// http://localhost:8000/admin/add
router.post("/add", adminAddUser);

// http://localhost:8000/admin/show
router.get("/show", adminShowUsers)

module.exports = router;