const mongoose = require('mongoose')

const organisation = new mongoose.Schema({
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
    }
},{
    timestamps:true
})