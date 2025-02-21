const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const authorization = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json({error: "Authorization token required!"});

    const token = authorization.split(" ")[1];
    try {
        const response = jwt.verify(token, process.env.SECRET_JWT_TOKEN);
        const {_id} = response;
        console.log(response);
        req.user = await User.findOne({_id}).select("_id");
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Unauthorization denied!"})
    }
}

module.exports = authorization;