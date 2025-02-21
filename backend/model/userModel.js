const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.statics.signup = async function(email,password) {

    if(!email || !password){
        throw Error("All inputs is required!")
    }
    
    if(!validator.isStrongPassword(password)) throw Error("Strong password is required!")

    const exist = await this.findOne({email})
    if(exist){
        throw Error("This email already exist!!")
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await this.create({email , password: hashPassword})
    return user;
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password){
        throw Error("All inputs is required!");
    }
    const user = await this.findOne({email});

    if(!user) throw Error("Incorrect email!");
    
    const compare = await bcrypt.compare(password, user.password)

    if(!compare) throw Error("Incorrect password")

    return user;
}
module.exports = mongoose.model("User", userSchema);