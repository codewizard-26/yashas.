require("dotenv").config()
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
        required : [true, "Password is required"],
        min : [6, "Password must be atleast 6 characters long"]
    },
    name:{
        type : String,
        required : [true, "Name is required"]
    },
    college:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'College'
    }
}, {
    timestamps:true
})

teacherSchema.pre("save", async function(next){
    if (this.isModified("password")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

teacherSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export const Teacher = mongoose.model("Teacher", teacherSchema)