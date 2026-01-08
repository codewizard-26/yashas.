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
    password:{
        type : String,
        min : [6, "The password must be atleast 6 characters long"]
    },
    college : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'college'
        }
    ]
    // college:{
    //     type : Array,
    //     required : [true, "Atleast one college is required"],
    // }
}, {
    timestamps:true
})

export const Institute = mongoose.model("Institute", instituteSchema)