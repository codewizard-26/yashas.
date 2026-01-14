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

associationSchema.pre("save", async function(next){
    if (this.isModified("passowrd")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

associationSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Association = mongoose.model("Association", associationSchema)