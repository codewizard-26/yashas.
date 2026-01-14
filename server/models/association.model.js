require("dotenv").config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const associationSchema = new mongoose.Schema({
    name:{
        type : String,
        unique : [true, "Association name must be unique"],
        required : [true, "Association name must be given"]
    },
    username:{
        type : String,
        unique : [true, "Username must be unique"],
        required : [true, "Username must be given"]
    },
    password:{
        type : String,
        required : [true, "Password is required"],
        min : [6, "Password must atleast be 6 characters long"]
    },
    organisation:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Organisation"
    },
    college:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "College"
    }
}, {
    timestamps : true
})

associationSchema.pre("save", async function(next){
    if (this.isModified("passowrd")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

associationSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return await jwt.sign(
        {
            _id : this.id,
            username : this.username,
            password : this.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
    return await jwt.sign(
        {
            _id : this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Association = mongoose.model("Association", associationSchema)