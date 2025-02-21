const User = require("../model/userModel");
const mongoose = require("mongoose");
const jsonWebtoken = require("jsonwebtoken");

//create toke
const createToken = (_id) => {
    const genToken = jsonWebtoken.sign({_id}, process.env.SECRET_JWT_TOKEN, {expiresIn: "3d"})
    return genToken;
}
//login
const loginUser = async (req,res) => {
    const {email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//signup
const signupUser = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = {
    loginUser,
    signupUser
}
