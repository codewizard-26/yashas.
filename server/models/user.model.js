const mongoose = require('mongoose');

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
    associations:{
        type : Array
    },
    Timestamp:true
    //address
    //parents contaacts
    //aadhaar no
    // abc id
});

export const User = mongoose.model("User", userSchema);