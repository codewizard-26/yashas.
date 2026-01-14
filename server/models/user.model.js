require("dotenv").config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : [true, "Username is required"],
        unique : [true, "Username already exists"]
    },
    email:{
        type : String,
        lowercase : [true, "Email must be lowercase"],
        required : [true, "Email is required"],
        unique : [true, "Email must be unique"]
    },
    password:{
        type : String,
        required : [true, "Password is required"],
        minlength : [6 , "Password must be atleast 6 characters long"]
    },
    phoneNumber:{
        type : Number,
        required : [true, "Phone number is required"],
        length : [10, "Phone number must be valid"]
    },
    name:{
        type : String,
        required : [true, "Name is required"]
    },
    gender:{
        type : String,
        enum : ["Male", "Female", "Others"]
    },
    college:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'College'
    },
    associations:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Organisation'
        }
    ],
    address:{
        type : String,
        required : [true, "Address is required"]
    },
    parentContacts:{
        type : Number,
        required : [true, "Parents phone number is required"],
        length : [10, "Phone number must be valid"]
    },
    parentsEmail:{
        type : String,
        lowercase : [true, "Email must be lowercase"],
        required : [true, "Email is required"],
        unique : [true, "Email must be unique"]
    },
    aadharNo:{
        type : String,
        required : [true, "Aadhar number is required"],
        length : [12, "Aadhar number should be 12 characters long"]
    },
    course:{
        type : String,
        required : [true, "Course is required"]
    }
}, {
    timestamps:true
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, process.env.SALT_ROUNDS)
        next()
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
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

export const User = mongoose.model("User", userSchema);