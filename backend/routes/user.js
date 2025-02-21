const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controllers/userController");
//login
router.post("/login", loginUser)

//sign-up
router.post("/signup", signupUser)

module.exports = router;