const express = require('express');
const router = express.Router();
const {userDefault, userHome, userAbout} = require("../controllers/userControllers")

// http://localhost:8000/user/
router.get("/", userDefault);

// http://localhost:8000/user/home
router.get("/home", userHome);

router.get("/about", userAbout);

module.exports = router;