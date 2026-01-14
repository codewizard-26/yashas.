require("dotenv").config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const organisationSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, "Organisation name is required"],
        unique : [true, "Organisation name must be unique"]
    },
    email:{
        type: String,
        required : [true, "Email is required"],
        lowercase : [true, "Email must be lowercase"],
        unique : [true, "Email must be unique"]
    },
    password:{
        type : String,
        min : [6, "The password must be atleast 6 characters long"],
        required : [true, "Password is required"]
    },
    associations:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Association"
        }
    ]
},{
    timestamps:true
})

organisationSchema.pre("save", async function(next){
    if (this.isModified("password")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

organisationSchema.methods.isPasswordCorrect = async function(password) {
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

export const Organisation = mongoose.model("Organisation", organisationSchema)