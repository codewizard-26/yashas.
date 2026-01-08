const mongoose = require("mongoose")

const collegeSchema = nnew.mongoose.Schema({
    name:{
        type : String,
        required : [true, "College name is required"],
        unique : [true, "College name must be unique"]
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
    institute:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Institute'
    }
})

export const College = mongoose.model("College", collegeSchema)