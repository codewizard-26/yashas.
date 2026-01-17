require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const collegeSchema = nnew.mongoose.Schema({
    name:{
        type : String,
        required : [true, "College name is required"],
        unique : [true, "College name must be unique"]
    },
    username:{
        type : String,
        required : [true, "Username is required"],
        unique : [true, "Username is unique"]
    },
    password:{
        type : String,
        required : [true, "Password is required"],
        min : [6, "Password is too small"]
    },
    address:{
        type : String,
        required : [true , "Address is required"],
        unique : [true, "Address must be unique"]
    },
    code:{
        type :Number,
        required : [true, "College code is required"],
        unique : [true, "College code must be unique"]
    },
    branch: {
        type: String,
        required: [true, "Branch is required"]
    },
    institute:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Institute'
    },
    association:[
        {
            type : mongoose.model.Types.ObjectId,
            ref : "Association"
        }
    ],
    students:[
        {
            type : mongoose.model.Types.ObjectId,
            ref : "User"
        }
    ]
}, {
    timestamps:true
})

collegeSchema.pre("save", async function(next){
    if (this.isModified("passowrd")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

collegeSchema.methods.isPasswordCorrect = async function (password) {
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

export const College = mongoose.model("College", collegeSchema)