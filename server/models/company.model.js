const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    companyName:{
        type : String,
        required : [true, "Company name is required."],
        unique: [true, "Company name must be unique."]
    },
    companyDomain:{
        type : String,
        required : [true, "Company domain is required."],
        unique: [true, "Company domain must be unique."]
        //Check for validity of original domain left
    },
    password:{
        type : string,
        min : [6, "The password must be atleast 6 characters long."],
        required:[true, "Password is required."]
    },
    branches: [
        {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Branch"
        }
    ]
},
{timestamps:true})

companySchema.pre("save", async function(next){
    if (this.isModified("password")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

companySchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export const  Company = mongoose.model("Company", companySchema)