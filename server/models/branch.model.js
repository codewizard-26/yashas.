const branchSchema= new mongoose.Schema({
    branchName:{
        type : String,
        required : [true, "Branch name is required."],
        unique: [true, "Branch name must be unique."]
    },

    userName:{
        type: String,
        required : [true, "Username is required."],
        unique : [true,"Username must be unique."]
    },
    password : {
        type: String,
        min : [6, "The password must be atleast 6 charachters long."],
        required : [true, "Password is required."]
    },
    company:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "Company",
        required : true
    }
},
{timestamps : true})

branchSchema.pre("save", async function(next){
    if (this.isModified("password")){
        this.password = bcrypt.hash(password, process.env.SALT_ROUNDS)
        next()
    }
})

branchSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}


export const Branch = mongoose.model("Branch", branchSchema)