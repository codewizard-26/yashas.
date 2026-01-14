require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema({
    email : {
        type : String,
        lowercase : [true, "Email must be lowercase"],
        unique : [true, "Email already exists"],
        required : [true, "Email is required"]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        min : [6, "Password must be atleast 6 characters long"]
    },
    name:{
        type : String,
        required : [true, "Name is required"]
    },
    college:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'College'
    }
}, {
    timestamps:true
})

teacherSchema.pre("save", async function(next){
    if (this.isModified("password")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

teacherSchema.methods.isPasswordCorrect = async function(password) {
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

export const Teacher = mongoose.model("Teacher", teacherSchema)