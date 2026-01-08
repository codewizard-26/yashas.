const mongoose = require("mongoose")

const instituteSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, "Institute name is required"],
        unique : [true, "Institute name must be unique"]
    },
    email:{
        type : String,
        lowercase : [true, "Email must be unique"],
        required : [true, "Email is required"],
        unique : [true, "Email must be unique"]
    },
    college:{
        type : Array,
        required : [true, "Atleast one college is required"],
    },
    timestamp : true
})

export const Institute = mongoose.model("Institute", instituteSchema)