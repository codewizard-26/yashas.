const mongoose = require('mongoose')

const associationSchema = new mongoose.Schema({
    name:{
        type : String,
        unique : [true, "Association name must be unique"],
        required : [true, "Association name must be given"]
    },
    password:{
        type : String,
        required : [true, "Password is required"],
        min : [6, "Password must atleast be 6 characters long"]
    },
}, {
    timestamps : true
})