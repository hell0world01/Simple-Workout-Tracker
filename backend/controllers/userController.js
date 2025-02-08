//login
const loginUser = async (req,res) => {
    res.json({msg: "User login"})
};

//signup
const signupUser = async (req,res) => {
    res.json({msg: "User signup"})
};

module.exports = {
    loginUser,
    signupUser
}
