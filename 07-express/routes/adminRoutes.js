const express = require('express');
const router = express.Router();
const { adminDefault, adminHome, adminAbout, adminGetUser } = require("../controllers/adminControllers");

// http://localhost:8000/admin/
router.get("/", adminDefault);

// http://localhost:8000/admin/home
router.get("/home", adminHome);

router.get("/about", adminAbout);

router.get("/user", adminGetUser);

module.exports = router;