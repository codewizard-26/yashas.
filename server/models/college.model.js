import { MongoGridFSChunkError } from "mongodb"

const mongoose = require("mongoose")

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

export const College = mongoose.model("College", collegeSchema)