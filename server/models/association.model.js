const mongoose = require('mongoose')

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

export const Association = mongoose.model("Association", associationSchema)