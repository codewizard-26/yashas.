const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    email : {
        type : String,
        lowercase : [true, "Email must be lowercase"],
        unique : [true, "Email already exists"],
        required : [true, "Email is required"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    name:{
        type : String,
        required : [true, "Name is required"]
    },
    college:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'College'
    },
    Timestamp:true
})

export const Teacher = mongoose.model("Teacher", teacherSchema)